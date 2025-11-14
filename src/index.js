import {
  debounce,
  getConfigForBreakpoint,
  addNamedEventListener,
  removeNamedEventListener
} from './modules/utils'
import { buildScrollbar } from './modules/scrollbar'
import { buildArrows } from './modules/arrows'
import { buildDots } from './modules/dots'
import { addClickDrag } from './modules/clickDrag'

/**
 * floSlide Carousel Library V0.95
 * @example
 *
 * // BASIC
 * floSlide('.js-mcp-recs-horizontal-12345')
 *
 * // KITCHEN SINK
 * floSlide('.js-mcp-recs-horizontal-12345', {
 *   slidesToShow: 2,
 *   slidesToScroll: 2,
 *   fade: false,
 *   arrows: true,
 *   dots: true,
 *   scrollbar: true,
 *   clickDrag: false,
 *   customArrows: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#000000" fill-rule="evenodd" d="M14.5 18.5 21 12l-6.5-6.5-.707.707 5.293 5.293H3v1h16.087l-5.294 5.293.707.707Z" clip-rule="evenodd"/></svg>',
 *   responsive: {
 *     767: {
 *       slidesToShow: 4,
 *       slidesToScroll: 4
 *     },
 *     1169: {
 *       slidesToShow: 5,
 *       slidesToScroll: 5,
 *       scrollbar: false
 *     }
 *   }
 * })
 */

class floSlideCore {
  constructor(selector, gallery, config) {
    this.data = {
      selector,
      config: this.mergeDefaults(config),
      els: {
        gallery,
        slides: []
      },
      eventListeners: [],
      uniqueGalleryId: this.createUniqueGalleryId(),
      arrowHtml:
        '<div style="transform: rotate(-45deg);height:15px;width:15px;border-right:2px solid grey;border-bottom: 2px solid grey"></div>'
    }
    this.init()
  }

  createUniqueGalleryId() {
    const date = Date.now()
    const id = `flo-gallery-${date}`
    if (window.FloSlideData.instances) {
      const instanceIndex = window.FloSlideData.instances.findIndex(
        (instance) => {
          return instance.data.uniqueGalleryId === id
        }
      )
      if (instanceIndex > -1) {
        return this.createUniqueGalleryId()
      }
    }
    return id
  }

  mergeDefaults(config) {
    const defaultConfig = {
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      fade: false,
      scrollbar: false,
      clickDrag: true,
      dots: false,
      customArrows: null,
      hideInactiveArrows: true,
      breakpointReinit: true,
      responsive: {}
    }

    const newConfig = { ...config }
    const baseConfig = { ...defaultConfig, ...newConfig }

    // Ensure slidesToScroll doesn't exceed slidesToShow in base config
    baseConfig.slidesToScroll = Math.min(baseConfig.slidesToScroll, baseConfig.slidesToShow)

    Object.keys(baseConfig.responsive).forEach((breakpoint) => {
      newConfig.responsive[breakpoint] = {
        ...baseConfig,
        ...newConfig.responsive[breakpoint]
      }
      // Ensure slidesToScroll doesn't exceed slidesToShow in responsive configs
      newConfig.responsive[breakpoint].slidesToScroll = Math.min(
        newConfig.responsive[breakpoint].slidesToScroll,
        newConfig.responsive[breakpoint].slidesToShow
      )
    })
    return { 0: baseConfig, ...newConfig.responsive }
  }

  getChildWidthFromParent(parent) {
    const { slidesToShow } = getConfigForBreakpoint(this.data)
    return parent.offsetWidth / slidesToShow
  }

  setArrowVisibility() {
    const { hideInactiveArrows } = getConfigForBreakpoint(this.data)
    const {
      arrows: { previous, next },
      firstSlide,
      lastSlide
    } = this.data.els
    if (!hideInactiveArrows) return
    const isFirstSlideVisible =
      firstSlide.getAttribute('aria-hidden') === 'false'
    const isLastSlideVisible =
      lastSlide.getAttribute('aria-hidden') === 'false'
    previous.style.visibility = isFirstSlideVisible ? 'hidden' : 'visible'
    next.style.visibility = isLastSlideVisible ? 'hidden' : 'visible'
    previous.setAttribute(
      'aria-disabled',
      `${isFirstSlideVisible ? 'true' : 'false'}`
    )
    next.setAttribute(
      'aria-disabled',
      `${isLastSlideVisible ? 'true' : 'false'}`
    )
  }

  slideIsVisible(el, percentageVisible = 0.9) {
    const rect = el.getBoundingClientRect()
    const parentRect = el.parentElement.getBoundingClientRect()
    const intersectionHeight = Math.max(
      0,
      Math.min(rect.bottom, parentRect.bottom) -
      Math.max(rect.top, parentRect.top)
    )
    const intersectionWidth = Math.max(
      0,
      Math.min(rect.right, parentRect.right) -
      Math.max(rect.left, parentRect.left)
    )
    const intersectionArea = intersectionHeight * intersectionWidth
    const moduleArea = (rect.bottom - rect.top) * (rect.right - rect.left)
    const boolean = intersectionArea >= percentageVisible * moduleArea
    return boolean
  }

  setSlideADAVisibility() {
    this.data.els.slides.forEach((slide, i) => {
      if (this.slideIsVisible(slide)) {
        slide.setAttribute('aria-hidden', 'false')
        // slide.setAttribute('tabindex', '0')
        slide.removeAttribute('tabindex')
      } else {
        slide.setAttribute('aria-hidden', 'true')
        slide.setAttribute('tabindex', '-1')
      }
    })
  }

  setSlideCssVisibility() {
    this.data.els.slides.forEach((slide) => {
      if (!this.slideIsVisible(slide, 0.05)) slide.style.visibility = 'hidden'
      if (this.slideIsVisible(slide, 0.05)) slide.style.visibility = 'visible'
    })
  }

  manageElVisibility() {
    const { arrows } = getConfigForBreakpoint(this.data)
    const { slides, scrollTrack } = this.data.els
    this.setSlideADAVisibility()
    this.setSlideCssVisibility()
    if (arrows) this.setArrowVisibility()
    const debounceSlideAdaVis = debounce(
      this.setSlideADAVisibility.bind(this),
      100
    )
    const debouceSlideCssVis = debounce(
      this.setSlideCssVisibility.bind(this),
      200
    )
    const debounceSetArrowVis = debounce(() => {
      this.setArrowVisibility()
    }, 150)
    addNamedEventListener('scroll', this.data, scrollTrack, () => {
      slides.forEach((slide) => {
        slide.style.visibility = 'visible'
      })
      debounceSlideAdaVis()
      debouceSlideCssVis()
      if (arrows) debounceSetArrowVis()
    })
  }

  // BREAKPOINT REINIT
  reinit() {
    const {
      data,
      data: {
        els,
        els: { arrows, dots, scrollbar, scrollbarThumb, scrollTrack }
      }
    } = this
    if (arrows) {
      arrows.next.remove()
      arrows.previous.remove()
      delete els.arrows
    }
    if (dots) {
      dots.forEach((dot) => dot.remove())
      delete els.dots
    }
    if (scrollbar) {
      scrollbar.remove()
      delete els.scrollbar
    }
    if (scrollbarThumb) {
      scrollbarThumb.remove()
      delete els.scrollbarThumb
    }
    removeNamedEventListener('scroll', data)
    removeNamedEventListener('scrollend', data)
    this.buildElements()
    setTimeout(() => {
      this.manageElVisibility()
      scrollTrack.scrollLeft = 1
      scrollTrack.scrollLeft = 0
    }, 250)
  }

  setBreakpointReinit() {
    const debounceReinit = debounce((e) => this.reinit(), 350)
    this.data.breakpoints.forEach((breakpoint) => {
      const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)
      mediaQuery.addEventListener('change', debounceReinit)
    })
  }

  // INIT METHODS
  appendCssToHead() {
    const { uniqueGalleryId, config } = this.data
    const styleTag = document.createElement('style')
    styleTag.id = `${uniqueGalleryId}-style`
    const string = Object.entries(config)
      .map(([breakpoint, settings]) =>
        breakpoint === '0'
          ? `.${uniqueGalleryId} .flo-gallery-track > * { width: ${100 /
          settings.slidesToShow}%; }`
          : `@media(min-width: ${breakpoint}px) { .${uniqueGalleryId} .flo-gallery-track > * { width: ${100 /
          settings.slidesToShow}%; } }`
      )
      .join(' ')
    styleTag.textContent = string
    document.head.appendChild(styleTag)
  }

  buildElements() {
    const {
      arrows,
      scrollbar,
      dots,
      clickDrag,
      breakpointReinit
    } = getConfigForBreakpoint(this.data)
    const {
      els: { gallery, slides },
      uniqueGalleryId
    } = this.data
    const isFirstInit = !this.data.els.scrollTrack
    if (isFirstInit) {
      // Create required elements
      const scrollTrack = document.createElement('div')
      const scrollTrackWrapper = document.createElement('div')
      scrollTrack.append(...this.data.els.slides)
      scrollTrackWrapper.append(scrollTrack)
      gallery.insertAdjacentElement('afterbegin', scrollTrackWrapper)
      this.data.els.scrollTrack = scrollTrack
      this.data.els.scrollTrackWrapper = scrollTrackWrapper
      scrollTrack.id = uniqueGalleryId
      scrollTrack.classList.add('flo-gallery-track')
      scrollTrackWrapper.classList.add('flo-gallery-track-wrapper')
      slides.forEach((slide, i) => {
        slide.classList.add('flo-slide')
      })
      this.data.breakpoints = Object.keys(this.data.config)
      if (breakpointReinit && this.data.breakpoints.length > 1) {
        this.setBreakpointReinit()
      }
    }
    // Create Optional Elements
    if (clickDrag) addClickDrag(this.data)
    if (scrollbar) setTimeout(() => buildScrollbar(this.data), 1000)
    if (arrows) buildArrows(this.data)
    if (dots) buildDots(this.data)
  }

  init() {
    if (!this.data.els.gallery) {
      return console.warn(
        `floSlide: No elements found matching selector "${this.data.selector}".`
      )
    }
    // Adds attributes to the root gallery for ADA compliance
    this.data.els.gallery.setAttribute('role', 'region')
    this.data.els.gallery.setAttribute('aria-roledescription', 'carousel')
    this.data.els.gallery.setAttribute('aria-label', 'Marketing')

    this.data.els.gallery.classList.add(
      'flo-gallery',
      this.data.uniqueGalleryId
    )
    this.data.els.slides = [...this.data.els.gallery.children]
    this.data.els.firstSlide = this.data.els.slides[0]
    this.data.els.lastSlide = this.data.els.slides[
      this.data.els.slides.length - 1
    ]
    this.appendCssToHead()
    this.buildElements()
    setTimeout(() => {
      this.manageElVisibility()
      this.data.els.gallery.classList.add('flo-slider-loaded')
    }, 1000)
  }
}

/**
 * Main function, also allows for multiple gallery inits with one selector.
 */
const FloSlide = (selector, config) => {
  const galleries = document.querySelectorAll(selector)
  if (galleries.length === 0) return
  window.FloSlideData = window.FloSlideData || {}
  window.FloSlideData.instances = window.FloSlideData.instances || []

  galleries.forEach((currentGalleryElement) => {
    if (currentGalleryElement.dataset.floSlideInitialized === 'true') {
      return
    }
    const instanceExistsForElement = window.FloSlideData.instances.some(
      (instance) => instance.galleryDomElement === currentGalleryElement
    )

    if (instanceExistsForElement) {
      currentGalleryElement.dataset.floSlideInitialized = 'true'
      return
    }
    currentGalleryElement.dataset.floSlideInitialized = 'true'

    const newInstance = new floSlideCore(selector, currentGalleryElement, config)
    window.FloSlideData.instances.push(newInstance)
  })
}

export default FloSlide
