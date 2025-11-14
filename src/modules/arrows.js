import { getConfigForBreakpoint, getChildWidthFromParent } from './utils'

/**
 * Module for optional Arrows
 */

const calculateScrollPosition = (direction, data) => {
  const { slidesToScroll } = getConfigForBreakpoint(data)
  const { scrollTrack } = data.els
  const childWidth = getChildWidthFromParent(data)
  const scrollDirectionMultiplier = direction === 'next' ? 1 : -1
  let scrollPosition = scrollTrack.scrollLeft
  let currentOffset = scrollPosition % childWidth
  currentOffset = currentOffset <= 50 ? 0 : currentOffset
  currentOffset = childWidth - currentOffset < 1 ? 0 : currentOffset
  if (currentOffset !== 0) {
    if (direction === 'next') scrollPosition += (childWidth - currentOffset)
    if (direction === 'previous') scrollPosition -= currentOffset
  }
  scrollPosition += childWidth * slidesToScroll * scrollDirectionMultiplier
  return scrollPosition
}

// ARROW METHODS
const handleArrowClick = (direction, data) => {
  const { fade } = getConfigForBreakpoint(data)
  const { scrollTrack } = data.els
  const scrollPosition = calculateScrollPosition(direction, data)
  if (fade) {
    scrollTrack.style.opacity = '0'
    setTimeout(() => {
      scrollTrack.scroll({
        left: scrollPosition,
        top: 0,
        behavior: 'auto'
      })
      scrollTrack.style.opacity = '1'
    }, 400)
  } else {
    scrollTrack.scroll({
      left: scrollPosition,
      top: 0,
      behavior: 'smooth'
    })
  }
}

const buildArrow = (direction, arrowHtml, data) => {
  const { slidesToScroll } = getConfigForBreakpoint(data)
  const arrow = document.createElement('button')
  arrow.innerHTML = arrowHtml
  arrow.classList.add('arrow', `${direction.toLowerCase()}-arrow`)
  arrow.setAttribute('aria-controls', data.uniqueGalleryId)
  arrow.setAttribute('aria-label', `Show ${direction} ${slidesToScroll} slides`)
  return arrow
}

const buildArrows = data => {
  const { els, arrowHtml } = data
  const { customArrows } = getConfigForBreakpoint(data)
  const html = customArrows === '' ? '' : customArrows || arrowHtml
  const nextArrow = buildArrow('next', html, data)
  const previousArrow = buildArrow('previous', html, data)
  data.els.arrows = {
    next: nextArrow,
    previous: previousArrow
  }
  els.gallery.prepend(nextArrow)
  els.gallery.prepend(previousArrow)
  nextArrow.addEventListener('click', () => handleArrowClick('next', data))
  previousArrow.addEventListener('click', () => handleArrowClick('previous', data))
}

export { buildArrows, handleArrowClick }
