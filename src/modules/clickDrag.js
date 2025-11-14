let isDragging = false
let isClick = false
let startX, scrollLeft, clickStartTime

const handleMouseDown = (e, scrollTrack) => {
  if (e.button !== 0) return
  clickStartTime = Date.now()
  isDragging = true
  startX = e.pageX - scrollTrack.offsetLeft
  scrollLeft = scrollTrack.scrollLeft
}

const handleMouseUpAndLeave = e => {
  if (e.button !== 0) return
  isDragging = false
  isClick = Date.now() - clickStartTime < 350
  const clickableParent = e.target.closest('a, button')
  const tagName = e.target.tagName.toLowerCase()
  const classNames = [...e.target.classList]
  if (!isClick) {
    e.preventDefault()
  } else if (isClick && tagName === 'a') {
    e.target.click()
  } else if (isClick && tagName === 'button') {
    if (!classNames.includes('play-pause-button')) { e.target.click() }
  } else if (isClick && clickableParent) {
    clickableParent.click()
  }
  clickStartTime = null
}

const move = (e, scrollTrack) => {
  if (!isDragging) return
  e.preventDefault()
  const x = e.pageX - scrollTrack.offsetLeft
  const walk = x - startX
  scrollTrack.scrollLeft = scrollLeft - walk
}

const handleClick = e => { isClick = false }

const addClickDrag = (data) => {
  const { scrollTrack } = data.els
  scrollTrack.addEventListener('click', handleClick)
  scrollTrack.addEventListener('mousedown', (e) => handleMouseDown(e, scrollTrack))
  scrollTrack.addEventListener('mousemove', (e) => move(e, scrollTrack))
  scrollTrack.addEventListener('mouseup', handleMouseUpAndLeave)
  scrollTrack.addEventListener('mouseleave', handleMouseUpAndLeave)
}

export { addClickDrag }
