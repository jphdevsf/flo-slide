import { getConfigForBreakpoint, getChildWidthFromParent, addNamedEventListener } from './utils'

/**
 * Module for optional Dots
 */

const updateActiveDot = data => {
  const { slidesToScroll } = getConfigForBreakpoint(data)
  const { scrollTrack, dots } = data.els
  const childWidth = getChildWidthFromParent(data)
  const slidePosIndex = Math.round(scrollTrack.scrollLeft / childWidth)
  const activeIndex = Math.floor(slidePosIndex / slidesToScroll)
  dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex))
}

const buildDots = data => {
  const { scrollTrack, slides, scrollTrackWrapper } = data.els
  const { slidesToScroll, slidesToShow } = getConfigForBreakpoint(data)

  // Calculate dots needed considering both slidesToShow and slidesToScroll
  const remainingSlides = slides.length - slidesToShow
  const numDots = Math.ceil(remainingSlides / slidesToScroll) + 1

  const dotContainer = document.createElement('div')
  dotContainer.classList.add('flo-dots')

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('button')
    dot.classList.add('flo-dot')
    const slideIndex = i * slidesToScroll + 1
    const lastSlideInGroup = Math.min(slideIndex + slidesToShow - 1, slides.length)
    dot.setAttribute('aria-label', `Go to slides ${slideIndex}-${lastSlideInGroup}`)
    dotContainer.appendChild(dot)
    dot.addEventListener('click', () => {
      scrollTrack.scroll({
        left: i * getChildWidthFromParent(data) * slidesToScroll,
        top: 0,
        behavior: 'smooth'
      })
    })
  }

  addNamedEventListener('scrollend', data, scrollTrack, () => updateActiveDot(data))
  scrollTrackWrapper.appendChild(dotContainer)
  data.els.dots = dotContainer.querySelectorAll('.flo-dot')
  updateActiveDot(data)
}

export { buildDots }
