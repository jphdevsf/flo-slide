const addNamedEventListener = (eventName, data, element, handler) => {
  element.addEventListener(eventName, handler)
  data.eventListeners[eventName] = data.eventListeners[eventName] || []
  data.eventListeners[eventName].push({ element, handler })
}

const removeNamedEventListener = (eventName, data) => {
  if (data.eventListeners[eventName]) {
    data.eventListeners[eventName].forEach(({ element, handler }) => {
      element.removeEventListener(eventName, handler)
    })
    delete data.eventListeners[eventName]
  }
}

const debounce = (func, wait = 250, immediate = false) => {
  let timeout
  return function (...args) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args) // Call func only if not immediate
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args) // Call func immediately if required
  }
}

const getConfigForBreakpoint = data => {
  const key = Math.max(...Object.keys(data.config).filter(breakpoint => window.innerWidth >= breakpoint))
  data.currentBreakpoint = key
  return data.config[key]
}

const getChildWidthFromParent = (data) => {
  const { slidesToShow } = getConfigForBreakpoint(data)
  return data.els.scrollTrack.offsetWidth / slidesToShow
}

export {
  debounce,
  getConfigForBreakpoint,
  getChildWidthFromParent,
  addNamedEventListener,
  removeNamedEventListener }
