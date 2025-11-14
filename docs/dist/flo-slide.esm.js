/*!
 * flo-slide v1.0.0
 * A Lightweight, ADA compliant, and responsive carousel gallery component
 * Licensed under the ISC License
 */
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var addNamedEventListener = function addNamedEventListener(eventName, data, element, handler) {
  element.addEventListener(eventName, handler);
  data.eventListeners[eventName] = data.eventListeners[eventName] || [];
  data.eventListeners[eventName].push({
    element: element,
    handler: handler
  });
};
var removeNamedEventListener = function removeNamedEventListener(eventName, data) {
  if (data.eventListeners[eventName]) {
    data.eventListeners[eventName].forEach(function (_ref) {
      var element = _ref.element,
        handler = _ref.handler;
      element.removeEventListener(eventName, handler);
    });
    delete data.eventListeners[eventName];
  }
};
var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(_this, args); // Call func only if not immediate
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args); // Call func immediately if required
  };
};
var getConfigForBreakpoint = function getConfigForBreakpoint(data) {
  var key = Math.max.apply(Math, _toConsumableArray(Object.keys(data.config).filter(function (breakpoint) {
    return window.innerWidth >= breakpoint;
  })));
  data.currentBreakpoint = key;
  return data.config[key];
};
var getChildWidthFromParent = function getChildWidthFromParent(data) {
  var _getConfigForBreakpoi = getConfigForBreakpoint(data),
    slidesToShow = _getConfigForBreakpoi.slidesToShow;
  return data.els.scrollTrack.offsetWidth / slidesToShow;
};

/**
 * Module for optional Scrollbar
 */

var addScrollbarMouseControl = function addScrollbarMouseControl(els) {
  var scrollTrack = els.scrollTrack,
    scrollbarThumb = els.scrollbarThumb,
    scrollbar = els.scrollbar,
    gallery = els.gallery;
  var isDragging = false;
  var startCursorPos, containerOffsetLeft, scrollbarScrollableWidth;
  var onMouseDown = function onMouseDown(e) {
    if (e.target === scrollbarThumb) {
      isDragging = true;
      containerOffsetLeft = scrollbar.getBoundingClientRect().left;
      scrollbarScrollableWidth = scrollbar.offsetWidth - scrollbarThumb.offsetWidth;
      startCursorPos = e.pageX - containerOffsetLeft - scrollbarThumb.offsetLeft;
      gallery.classList.add('no-select');
    }
  };
  var onMouseMove = debounce(function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var nowCursorPos = e.pageX - containerOffsetLeft;
    var nowOffset = nowCursorPos - startCursorPos;
    var percentageScrolled = nowOffset / scrollbarScrollableWidth;
    if (percentageScrolled > 1) percentageScrolled = 1;
    if (percentageScrolled < 0) percentageScrolled = 0;
    scrollTrack.scrollLeft = percentageScrolled * (scrollTrack.scrollWidth - scrollTrack.clientWidth);
  }, 10, true);
  var onMouseUp = function onMouseUp(e) {
    isDragging = false;
    els.gallery.classList.remove('no-select');
  };
  scrollbarThumb.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
var addScrollbarKeyboardControl = function addScrollbarKeyboardControl(data) {
  var _data$els = data.els,
    scrollTrack = _data$els.scrollTrack,
    scrollbarThumb = _data$els.scrollbarThumb;
  scrollbarThumb.addEventListener('keydown', function (e) {
    var childWidth = getChildWidthFromParent(data);
    if (e.key === 'ArrowLeft') scrollTrack.scrollLeft = Math.max(scrollTrack.scrollLeft - childWidth, 0);
    if (e.key === 'ArrowRight') scrollTrack.scrollLeft = Math.min(scrollTrack.scrollLeft + childWidth, scrollTrack.scrollWidth - scrollTrack.clientWidth);
  });
};
var setScrollbarPosition = function setScrollbarPosition(els) {
  var scrollTrack = els.scrollTrack,
    scrollbarThumb = els.scrollbarThumb;
  var scrollTrackWidth = scrollTrack.scrollWidth;
  var scrollTrackClientWidth = scrollTrack.clientWidth;
  var scrollLeft = scrollTrack.scrollLeft;
  var thumbWidth = scrollTrackClientWidth / scrollTrackWidth;
  var scrollTrackPosition = scrollLeft / (scrollTrackWidth - scrollTrackClientWidth);
  var scrollableWidth = scrollTrackClientWidth * (1 - thumbWidth);
  scrollbarThumb.style.width = "".concat(Math.round(thumbWidth * 100), "%");
  scrollbarThumb.setAttribute('aria-valuenow', "".concat(Math.round(scrollTrackPosition * 100)));
  scrollbarThumb.style.left = "".concat(Math.round(scrollTrackPosition * scrollableWidth), "px");
};
var buildScrollbar = function buildScrollbar(data) {
  var uniqueGalleryId = data.uniqueGalleryId,
    els = data.els,
    _data$els2 = data.els,
    scrollTrack = _data$els2.scrollTrack,
    scrollTrackWrapper = _data$els2.scrollTrackWrapper;
  var scrollbar = document.createElement('div');
  scrollbar.classList.add('flo-scrollbar');
  scrollbar.setAttribute('aria-label', 'Horizontal scrollbar');
  scrollbar.setAttribute('role', 'scrollbar');
  scrollbar.setAttribute('aria-controls', uniqueGalleryId);
  scrollbar.setAttribute('aria-orientation', 'horizontal');
  var scrollbarThumb = document.createElement('div');
  scrollbarThumb.classList.add('flo-scrollbar-thumb');
  scrollbarThumb.setAttribute('aria-valuemin', '0');
  scrollbarThumb.setAttribute('aria-valuemax', '100');
  scrollbarThumb.setAttribute('aria-valuenow', '0');
  scrollbarThumb.setAttribute('tabindex', '0');
  scrollbar.appendChild(scrollbarThumb);
  scrollTrackWrapper.appendChild(scrollbar);
  els.scrollbar = scrollbar;
  els.scrollbarThumb = scrollbarThumb;
  setScrollbarPosition(els);
  var debounceSetSBPos = debounce(function () {
    return setScrollbarPosition(els);
  }, 5, true);
  addNamedEventListener('scroll', data, scrollTrack, debounceSetSBPos);
  addScrollbarKeyboardControl(data);
  addScrollbarMouseControl(els);
};

/**
 * Module for optional Arrows
 */

var calculateScrollPosition = function calculateScrollPosition(direction, data) {
  var _getConfigForBreakpoi = getConfigForBreakpoint(data),
    slidesToScroll = _getConfigForBreakpoi.slidesToScroll;
  var scrollTrack = data.els.scrollTrack;
  var childWidth = getChildWidthFromParent(data);
  var scrollDirectionMultiplier = direction === 'next' ? 1 : -1;
  var scrollPosition = scrollTrack.scrollLeft;
  var currentOffset = scrollPosition % childWidth;
  currentOffset = currentOffset <= 50 ? 0 : currentOffset;
  currentOffset = childWidth - currentOffset < 1 ? 0 : currentOffset;
  if (currentOffset !== 0) {
    if (direction === 'next') scrollPosition += childWidth - currentOffset;
    if (direction === 'previous') scrollPosition -= currentOffset;
  }
  scrollPosition += childWidth * slidesToScroll * scrollDirectionMultiplier;
  return scrollPosition;
};

// ARROW METHODS
var handleArrowClick = function handleArrowClick(direction, data) {
  var _getConfigForBreakpoi2 = getConfigForBreakpoint(data),
    fade = _getConfigForBreakpoi2.fade;
  var scrollTrack = data.els.scrollTrack;
  var scrollPosition = calculateScrollPosition(direction, data);
  if (fade) {
    scrollTrack.style.opacity = '0';
    setTimeout(function () {
      scrollTrack.scroll({
        left: scrollPosition,
        top: 0,
        behavior: 'auto'
      });
      scrollTrack.style.opacity = '1';
    }, 400);
  } else {
    scrollTrack.scroll({
      left: scrollPosition,
      top: 0,
      behavior: 'smooth'
    });
  }
};
var buildArrow = function buildArrow(direction, arrowHtml, data) {
  var _getConfigForBreakpoi3 = getConfigForBreakpoint(data),
    slidesToScroll = _getConfigForBreakpoi3.slidesToScroll;
  var arrow = document.createElement('button');
  arrow.innerHTML = arrowHtml;
  arrow.classList.add('arrow', "".concat(direction.toLowerCase(), "-arrow"));
  arrow.setAttribute('aria-controls', data.uniqueGalleryId);
  arrow.setAttribute('aria-label', "Show ".concat(direction, " ").concat(slidesToScroll, " slides"));
  return arrow;
};
var buildArrows = function buildArrows(data) {
  var els = data.els,
    arrowHtml = data.arrowHtml;
  var _getConfigForBreakpoi4 = getConfigForBreakpoint(data),
    customArrows = _getConfigForBreakpoi4.customArrows;
  var html = customArrows === '' ? '' : customArrows || arrowHtml;
  var nextArrow = buildArrow('next', html, data);
  var previousArrow = buildArrow('previous', html, data);
  data.els.arrows = {
    next: nextArrow,
    previous: previousArrow
  };
  els.gallery.prepend(nextArrow);
  els.gallery.prepend(previousArrow);
  nextArrow.addEventListener('click', function () {
    return handleArrowClick('next', data);
  });
  previousArrow.addEventListener('click', function () {
    return handleArrowClick('previous', data);
  });
};

/**
 * Module for optional Dots
 */

var updateActiveDot = function updateActiveDot(data) {
  var _getConfigForBreakpoi = getConfigForBreakpoint(data),
    slidesToScroll = _getConfigForBreakpoi.slidesToScroll;
  var _data$els = data.els,
    scrollTrack = _data$els.scrollTrack,
    dots = _data$els.dots;
  var childWidth = getChildWidthFromParent(data);
  var slidePosIndex = Math.round(scrollTrack.scrollLeft / childWidth);
  var activeIndex = Math.floor(slidePosIndex / slidesToScroll);
  dots.forEach(function (dot, i) {
    return dot.classList.toggle('active', i === activeIndex);
  });
};
var buildDots = function buildDots(data) {
  var _data$els2 = data.els,
    scrollTrack = _data$els2.scrollTrack,
    slides = _data$els2.slides,
    scrollTrackWrapper = _data$els2.scrollTrackWrapper;
  var _getConfigForBreakpoi2 = getConfigForBreakpoint(data),
    slidesToScroll = _getConfigForBreakpoi2.slidesToScroll,
    slidesToShow = _getConfigForBreakpoi2.slidesToShow;

  // Calculate dots needed considering both slidesToShow and slidesToScroll
  var remainingSlides = slides.length - slidesToShow;
  var numDots = Math.ceil(remainingSlides / slidesToScroll) + 1;
  var dotContainer = document.createElement('div');
  dotContainer.classList.add('flo-dots');
  var _loop = function _loop(i) {
    var dot = document.createElement('button');
    dot.classList.add('flo-dot');
    var slideIndex = i * slidesToScroll + 1;
    var lastSlideInGroup = Math.min(slideIndex + slidesToShow - 1, slides.length);
    dot.setAttribute('aria-label', "Go to slides ".concat(slideIndex, "-").concat(lastSlideInGroup));
    dotContainer.appendChild(dot);
    dot.addEventListener('click', function () {
      scrollTrack.scroll({
        left: i * getChildWidthFromParent(data) * slidesToScroll,
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  for (var i = 0; i < numDots; i++) {
    _loop(i);
  }
  addNamedEventListener('scrollend', data, scrollTrack, function () {
    return updateActiveDot(data);
  });
  scrollTrackWrapper.appendChild(dotContainer);
  data.els.dots = dotContainer.querySelectorAll('.flo-dot');
  updateActiveDot(data);
};

var isDragging = false;
var isClick = false;
var startX, scrollLeft, clickStartTime;
var handleMouseDown = function handleMouseDown(e, scrollTrack) {
  if (e.button !== 0) return;
  clickStartTime = Date.now();
  isDragging = true;
  startX = e.pageX - scrollTrack.offsetLeft;
  scrollLeft = scrollTrack.scrollLeft;
};
var handleMouseUpAndLeave = function handleMouseUpAndLeave(e) {
  if (e.button !== 0) return;
  isDragging = false;
  isClick = Date.now() - clickStartTime < 350;
  var clickableParent = e.target.closest('a, button');
  var tagName = e.target.tagName.toLowerCase();
  var classNames = _toConsumableArray(e.target.classList);
  if (!isClick) {
    e.preventDefault();
  } else if (isClick && tagName === 'a') {
    e.target.click();
  } else if (isClick && tagName === 'button') {
    if (!classNames.includes('play-pause-button')) {
      e.target.click();
    }
  } else if (isClick && clickableParent) {
    clickableParent.click();
  }
  clickStartTime = null;
};
var move = function move(e, scrollTrack) {
  if (!isDragging) return;
  e.preventDefault();
  var x = e.pageX - scrollTrack.offsetLeft;
  var walk = x - startX;
  scrollTrack.scrollLeft = scrollLeft - walk;
};
var handleClick = function handleClick(e) {
  isClick = false;
};
var addClickDrag = function addClickDrag(data) {
  var scrollTrack = data.els.scrollTrack;
  scrollTrack.addEventListener('click', handleClick);
  scrollTrack.addEventListener('mousedown', function (e) {
    return handleMouseDown(e, scrollTrack);
  });
  scrollTrack.addEventListener('mousemove', function (e) {
    return move(e, scrollTrack);
  });
  scrollTrack.addEventListener('mouseup', handleMouseUpAndLeave);
  scrollTrack.addEventListener('mouseleave', handleMouseUpAndLeave);
};

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
var floSlideCore = /*#__PURE__*/function () {
  function floSlideCore(selector, gallery, config) {
    _classCallCheck(this, floSlideCore);
    this.data = {
      selector: selector,
      config: this.mergeDefaults(config),
      els: {
        gallery: gallery,
        slides: []
      },
      eventListeners: [],
      uniqueGalleryId: this.createUniqueGalleryId(),
      arrowHtml: '<div style="transform: rotate(-45deg);height:15px;width:15px;border-right:2px solid grey;border-bottom: 2px solid grey"></div>'
    };
    this.init();
  }
  return _createClass(floSlideCore, [{
    key: "createUniqueGalleryId",
    value: function createUniqueGalleryId() {
      var date = Date.now();
      var id = "flo-gallery-".concat(date);
      if (window.FloSlideData.instances) {
        var instanceIndex = window.FloSlideData.instances.findIndex(function (instance) {
          return instance.data.uniqueGalleryId === id;
        });
        if (instanceIndex > -1) {
          return this.createUniqueGalleryId();
        }
      }
      return id;
    }
  }, {
    key: "mergeDefaults",
    value: function mergeDefaults(config) {
      var defaultConfig = {
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
      };
      var newConfig = _objectSpread2({}, config);
      var baseConfig = _objectSpread2(_objectSpread2({}, defaultConfig), newConfig);

      // Ensure slidesToScroll doesn't exceed slidesToShow in base config
      baseConfig.slidesToScroll = Math.min(baseConfig.slidesToScroll, baseConfig.slidesToShow);
      Object.keys(baseConfig.responsive).forEach(function (breakpoint) {
        newConfig.responsive[breakpoint] = _objectSpread2(_objectSpread2({}, baseConfig), newConfig.responsive[breakpoint]);
        // Ensure slidesToScroll doesn't exceed slidesToShow in responsive configs
        newConfig.responsive[breakpoint].slidesToScroll = Math.min(newConfig.responsive[breakpoint].slidesToScroll, newConfig.responsive[breakpoint].slidesToShow);
      });
      return _objectSpread2({
        0: baseConfig
      }, newConfig.responsive);
    }
  }, {
    key: "getChildWidthFromParent",
    value: function getChildWidthFromParent(parent) {
      var _getConfigForBreakpoi = getConfigForBreakpoint(this.data),
        slidesToShow = _getConfigForBreakpoi.slidesToShow;
      return parent.offsetWidth / slidesToShow;
    }
  }, {
    key: "setArrowVisibility",
    value: function setArrowVisibility() {
      var _getConfigForBreakpoi2 = getConfigForBreakpoint(this.data),
        hideInactiveArrows = _getConfigForBreakpoi2.hideInactiveArrows;
      var _this$data$els = this.data.els,
        _this$data$els$arrows = _this$data$els.arrows,
        previous = _this$data$els$arrows.previous,
        next = _this$data$els$arrows.next,
        firstSlide = _this$data$els.firstSlide,
        lastSlide = _this$data$els.lastSlide;
      if (!hideInactiveArrows) return;
      var isFirstSlideVisible = firstSlide.getAttribute('aria-hidden') === 'false';
      var isLastSlideVisible = lastSlide.getAttribute('aria-hidden') === 'false';
      previous.style.visibility = isFirstSlideVisible ? 'hidden' : 'visible';
      next.style.visibility = isLastSlideVisible ? 'hidden' : 'visible';
      previous.setAttribute('aria-disabled', "".concat(isFirstSlideVisible ? 'true' : 'false'));
      next.setAttribute('aria-disabled', "".concat(isLastSlideVisible ? 'true' : 'false'));
    }
  }, {
    key: "slideIsVisible",
    value: function slideIsVisible(el) {
      var percentageVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.9;
      var rect = el.getBoundingClientRect();
      var parentRect = el.parentElement.getBoundingClientRect();
      var intersectionHeight = Math.max(0, Math.min(rect.bottom, parentRect.bottom) - Math.max(rect.top, parentRect.top));
      var intersectionWidth = Math.max(0, Math.min(rect.right, parentRect.right) - Math.max(rect.left, parentRect.left));
      var intersectionArea = intersectionHeight * intersectionWidth;
      var moduleArea = (rect.bottom - rect.top) * (rect.right - rect.left);
      var boolean = intersectionArea >= percentageVisible * moduleArea;
      return boolean;
    }
  }, {
    key: "setSlideADAVisibility",
    value: function setSlideADAVisibility() {
      var _this = this;
      this.data.els.slides.forEach(function (slide, i) {
        if (_this.slideIsVisible(slide)) {
          slide.setAttribute('aria-hidden', 'false');
          // slide.setAttribute('tabindex', '0')
          slide.removeAttribute('tabindex');
        } else {
          slide.setAttribute('aria-hidden', 'true');
          slide.setAttribute('tabindex', '-1');
        }
      });
    }
  }, {
    key: "setSlideCssVisibility",
    value: function setSlideCssVisibility() {
      var _this2 = this;
      this.data.els.slides.forEach(function (slide) {
        if (!_this2.slideIsVisible(slide, 0.05)) slide.style.visibility = 'hidden';
        if (_this2.slideIsVisible(slide, 0.05)) slide.style.visibility = 'visible';
      });
    }
  }, {
    key: "manageElVisibility",
    value: function manageElVisibility() {
      var _this3 = this;
      var _getConfigForBreakpoi3 = getConfigForBreakpoint(this.data),
        arrows = _getConfigForBreakpoi3.arrows;
      var _this$data$els2 = this.data.els,
        slides = _this$data$els2.slides,
        scrollTrack = _this$data$els2.scrollTrack;
      this.setSlideADAVisibility();
      this.setSlideCssVisibility();
      if (arrows) this.setArrowVisibility();
      var debounceSlideAdaVis = debounce(this.setSlideADAVisibility.bind(this), 100);
      var debouceSlideCssVis = debounce(this.setSlideCssVisibility.bind(this), 200);
      var debounceSetArrowVis = debounce(function () {
        _this3.setArrowVisibility();
      }, 150);
      addNamedEventListener('scroll', this.data, scrollTrack, function () {
        slides.forEach(function (slide) {
          slide.style.visibility = 'visible';
        });
        debounceSlideAdaVis();
        debouceSlideCssVis();
        if (arrows) debounceSetArrowVis();
      });
    }

    // BREAKPOINT REINIT
  }, {
    key: "reinit",
    value: function reinit() {
      var _this4 = this;
      var data = this.data,
        _this$data = this.data,
        els = _this$data.els,
        _this$data$els3 = _this$data.els,
        arrows = _this$data$els3.arrows,
        dots = _this$data$els3.dots,
        scrollbar = _this$data$els3.scrollbar,
        scrollbarThumb = _this$data$els3.scrollbarThumb,
        scrollTrack = _this$data$els3.scrollTrack;
      if (arrows) {
        arrows.next.remove();
        arrows.previous.remove();
        delete els.arrows;
      }
      if (dots) {
        dots.forEach(function (dot) {
          return dot.remove();
        });
        delete els.dots;
      }
      if (scrollbar) {
        scrollbar.remove();
        delete els.scrollbar;
      }
      if (scrollbarThumb) {
        scrollbarThumb.remove();
        delete els.scrollbarThumb;
      }
      removeNamedEventListener('scroll', data);
      removeNamedEventListener('scrollend', data);
      this.buildElements();
      setTimeout(function () {
        _this4.manageElVisibility();
        scrollTrack.scrollLeft = 1;
        scrollTrack.scrollLeft = 0;
      }, 250);
    }
  }, {
    key: "setBreakpointReinit",
    value: function setBreakpointReinit() {
      var _this5 = this;
      var debounceReinit = debounce(function (e) {
        return _this5.reinit();
      }, 350);
      this.data.breakpoints.forEach(function (breakpoint) {
        var mediaQuery = window.matchMedia("(min-width: ".concat(breakpoint, "px)"));
        mediaQuery.addEventListener('change', debounceReinit);
      });
    }

    // INIT METHODS
  }, {
    key: "appendCssToHead",
    value: function appendCssToHead() {
      var _this$data2 = this.data,
        uniqueGalleryId = _this$data2.uniqueGalleryId,
        config = _this$data2.config;
      var styleTag = document.createElement('style');
      styleTag.id = "".concat(uniqueGalleryId, "-style");
      var string = Object.entries(config).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          breakpoint = _ref2[0],
          settings = _ref2[1];
        return breakpoint === '0' ? ".".concat(uniqueGalleryId, " .flo-gallery-track > * { width: ").concat(100 / settings.slidesToShow, "%; }") : "@media(min-width: ".concat(breakpoint, "px) { .").concat(uniqueGalleryId, " .flo-gallery-track > * { width: ").concat(100 / settings.slidesToShow, "%; } }");
      }).join(' ');
      styleTag.textContent = string;
      document.head.appendChild(styleTag);
    }
  }, {
    key: "buildElements",
    value: function buildElements() {
      var _this6 = this;
      var _getConfigForBreakpoi4 = getConfigForBreakpoint(this.data),
        arrows = _getConfigForBreakpoi4.arrows,
        scrollbar = _getConfigForBreakpoi4.scrollbar,
        dots = _getConfigForBreakpoi4.dots,
        clickDrag = _getConfigForBreakpoi4.clickDrag,
        breakpointReinit = _getConfigForBreakpoi4.breakpointReinit;
      var _this$data3 = this.data,
        _this$data3$els = _this$data3.els,
        gallery = _this$data3$els.gallery,
        slides = _this$data3$els.slides,
        uniqueGalleryId = _this$data3.uniqueGalleryId;
      var isFirstInit = !this.data.els.scrollTrack;
      if (isFirstInit) {
        // Create required elements
        var scrollTrack = document.createElement('div');
        var scrollTrackWrapper = document.createElement('div');
        scrollTrack.append.apply(scrollTrack, _toConsumableArray(this.data.els.slides));
        scrollTrackWrapper.append(scrollTrack);
        gallery.insertAdjacentElement('afterbegin', scrollTrackWrapper);
        this.data.els.scrollTrack = scrollTrack;
        this.data.els.scrollTrackWrapper = scrollTrackWrapper;
        scrollTrack.id = uniqueGalleryId;
        scrollTrack.classList.add('flo-gallery-track');
        scrollTrackWrapper.classList.add('flo-gallery-track-wrapper');
        slides.forEach(function (slide, i) {
          slide.classList.add('flo-slide');
        });
        this.data.breakpoints = Object.keys(this.data.config);
        if (breakpointReinit && this.data.breakpoints.length > 1) {
          this.setBreakpointReinit();
        }
      }
      // Create Optional Elements
      if (clickDrag) addClickDrag(this.data);
      if (scrollbar) setTimeout(function () {
        return buildScrollbar(_this6.data);
      }, 1000);
      if (arrows) buildArrows(this.data);
      if (dots) buildDots(this.data);
    }
  }, {
    key: "init",
    value: function init() {
      var _this7 = this;
      if (!this.data.els.gallery) {
        return console.warn("floSlide: No elements found matching selector \"".concat(this.data.selector, "\"."));
      }
      // Adds attributes to the root gallery for ADA compliance
      this.data.els.gallery.setAttribute('role', 'region');
      this.data.els.gallery.setAttribute('aria-roledescription', 'carousel');
      this.data.els.gallery.setAttribute('aria-label', 'Marketing');
      this.data.els.gallery.classList.add('flo-gallery', this.data.uniqueGalleryId);
      this.data.els.slides = _toConsumableArray(this.data.els.gallery.children);
      this.data.els.firstSlide = this.data.els.slides[0];
      this.data.els.lastSlide = this.data.els.slides[this.data.els.slides.length - 1];
      this.appendCssToHead();
      this.buildElements();
      setTimeout(function () {
        _this7.manageElVisibility();
        _this7.data.els.gallery.classList.add('flo-slider-loaded');
      }, 1000);
    }
  }]);
}();
/**
 * Main function, also allows for multiple gallery inits with one selector.
 */
var FloSlide = function FloSlide(selector, config) {
  var galleries = document.querySelectorAll(selector);
  if (galleries.length === 0) return;
  window.FloSlideData = window.FloSlideData || {};
  window.FloSlideData.instances = window.FloSlideData.instances || [];
  galleries.forEach(function (currentGalleryElement) {
    if (currentGalleryElement.dataset.floSlideInitialized === 'true') {
      return;
    }
    var instanceExistsForElement = window.FloSlideData.instances.some(function (instance) {
      return instance.galleryDomElement === currentGalleryElement;
    });
    if (instanceExistsForElement) {
      currentGalleryElement.dataset.floSlideInitialized = 'true';
      return;
    }
    currentGalleryElement.dataset.floSlideInitialized = 'true';
    var newInstance = new floSlideCore(selector, currentGalleryElement, config);
    window.FloSlideData.instances.push(newInstance);
  });
};

export { FloSlide as default };
//# sourceMappingURL=flo-slide.esm.js.map
