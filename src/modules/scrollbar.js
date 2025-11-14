import { debounce, getChildWidthFromParent, addNamedEventListener } from './utils'
/**
 * Module for optional Scrollbar
 */

const addScrollbarMouseControl = els => {
  const { scrollTrack, scrollbarThumb, scrollbar, gallery } = els
  let isDragging = false
  let startCursorPos, containerOffsetLeft, scrollbarScrollableWidth

  const onMouseDown = (e) => {
    if (e.target === scrollbarThumb) {
      isDragging = true
      containerOffsetLeft = scrollbar.getBoundingClientRect().left
      scrollbarScrollableWidth = scrollbar.offsetWidth - scrollbarThumb.offsetWidth
      startCursorPos = e.pageX - containerOffsetLeft - scrollbarThumb.offsetLeft
      gallery.classList.add('no-select')
    }
  }

  const onMouseMove = debounce((e) => {
    if (!isDragging) return
    e.preventDefault()
    const nowCursorPos = e.pageX - containerOffsetLeft
    const nowOffset = (nowCursorPos - startCursorPos)
    let percentageScrolled = nowOffset / scrollbarScrollableWidth
    if (percentageScrolled > 1) percentageScrolled = 1
    if (percentageScrolled < 0) percentageScrolled = 0
    scrollTrack.scrollLeft = percentageScrolled * (scrollTrack.scrollWidth - scrollTrack.clientWidth)
  }, 10, true)

  const onMouseUp = (e) => {
    isDragging = false
    els.gallery.classList.remove('no-select')
  }
  scrollbarThumb.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const addScrollbarKeyboardControl = data => {
  const { scrollTrack, scrollbarThumb } = data.els
  scrollbarThumb.addEventListener('keydown', e => {
    const childWidth = getChildWidthFromParent(data)
    if (e.key === 'ArrowLeft') scrollTrack.scrollLeft = Math.max(scrollTrack.scrollLeft - childWidth, 0)
    if (e.key === 'ArrowRight') scrollTrack.scrollLeft = Math.min(scrollTrack.scrollLeft + childWidth, scrollTrack.scrollWidth - scrollTrack.clientWidth)
  })
}

const setScrollbarPosition = els => {
  const { scrollTrack, scrollbarThumb } = els
  const scrollTrackWidth = scrollTrack.scrollWidth
  const scrollTrackClientWidth = scrollTrack.clientWidth
  const scrollLeft = scrollTrack.scrollLeft
  const thumbWidth = scrollTrackClientWidth / scrollTrackWidth
  const scrollTrackPosition = scrollLeft / (scrollTrackWidth - scrollTrackClientWidth)
  const scrollableWidth = scrollTrackClientWidth * (1 - thumbWidth)
  scrollbarThumb.style.width = `${Math.round(thumbWidth * 100)}%`
  scrollbarThumb.setAttribute('aria-valuenow', `${Math.round(scrollTrackPosition * 100)}`)
  scrollbarThumb.style.left = `${Math.round(scrollTrackPosition * scrollableWidth)}px`
}

const buildScrollbar = (data) => {
  const { uniqueGalleryId, els, els: { scrollTrack, scrollTrackWrapper } } = data
  const scrollbar = document.createElement('div')
  scrollbar.classList.add('flo-scrollbar')
  scrollbar.setAttribute('aria-label', 'Horizontal scrollbar')
  scrollbar.setAttribute('role', 'scrollbar')
  scrollbar.setAttribute('aria-controls', uniqueGalleryId)
  scrollbar.setAttribute('aria-orientation', 'horizontal')

  const scrollbarThumb = document.createElement('div')
  scrollbarThumb.classList.add('flo-scrollbar-thumb')
  scrollbarThumb.setAttribute('aria-valuemin', '0')
  scrollbarThumb.setAttribute('aria-valuemax', '100')
  scrollbarThumb.setAttribute('aria-valuenow', '0')
  scrollbarThumb.setAttribute('tabindex', '0')

  scrollbar.appendChild(scrollbarThumb)
  scrollTrackWrapper.appendChild(scrollbar)
  els.scrollbar = scrollbar
  els.scrollbarThumb = scrollbarThumb

  setScrollbarPosition(els)
  const debounceSetSBPos = debounce(() => setScrollbarPosition(els), 5, true)
  addNamedEventListener('scroll', data, scrollTrack, debounceSetSBPos)
  addScrollbarKeyboardControl(data)
  addScrollbarMouseControl(els)
}

export { buildScrollbar }
