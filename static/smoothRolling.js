export default function SmoothRolling() {
  this.range = 0

  // link: https://developer.mozilla.org/zh-CN/docs/Web/Events/wheel
  // creates a global "addWheelListener" method
  // example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
  ;(function (window, document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if (window.addEventListener) {
      _addEventListener = "addEventListener";
    } else {
      _addEventListener = "attachEvent";
      prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // 各个厂商的高版本浏览器都支持"wheel"
      document.onmousewheel !== undefined ? "mousewheel" : // Webkit 和 IE一定支持"mousewheel"
        "DOMMouseScroll"; // 低版本firefox

    window.addWheelListener = function (elem, callback, useCapture) {
      _addWheelListener(elem, support, callback, useCapture);

      // handle MozMousePixelScroll in older Firefox
      if (support == "DOMMouseScroll") {
        _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
      }
    };

    function _addWheelListener(elem, eventName, callback, useCapture) {
      elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
        !originalEvent && (originalEvent = window.event);

        // create a normalized event object
        var event = {
          // keep a ref to the original event object
          originalEvent: originalEvent,
          target: originalEvent.target || originalEvent.srcElement,
          type: "wheel",
          deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function () {
            originalEvent.preventDefault ?
              originalEvent.preventDefault() :
              originalEvent.returnValue = false;
          }
        };

        // calculate deltaY (and deltaX) according to the event
        if (support == "mousewheel") {
          event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
          // Webkit also support wheelDeltaX
          originalEvent.wheelDeltaX && (event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX);
        } else {
          event.deltaY = originalEvent.detail;
        }

        // it's time to fire the callback
        return callback(event);

      }, useCapture || false);
    }

  })(window, document)
}

SmoothRolling.prototype.init = function () {
  var self = this, last

  window.addWheelListener(window, function (e) {
    var scrollEl = self.findScrollEl(e.target)
    var size = self.size(scrollEl)

    if (last != scrollEl) {
      self.range = scrollEl ? scrollEl.scrollTop : window.pageYOffset
      last = scrollEl
    }

    if (self.range <= 0 && e.deltaY > 0) self.range = 0
    else if (self.range >= e.deltaY && e.deltaY < 0) self.range = size.height
    else self.range -= e.deltaY

    console.log(`el:${scrollEl}\ndeltaY:${e.deltaY}\nrange:${self.range}`)

    e.preventDefault()
  })
}

SmoothRolling.prototype.findScrollEl = function (el) {
  if (el === document || el.tagName === 'BODY') return false

  while (!(el.scrollHeight - el.clientHeight > 0 && el.offsetWidth - el.clientWidth > 0)) {
    if (el === document || el.tagName === 'BODY') return false
    el = el.parentNode
  }

  return el
}

SmoothRolling.prototype.size = function (el) {
  var width = el
    ? el.scrollWidth - el.clientWidth
    : Math.max(document.body.scrollWidth, document.body.clientWidth) - document.documentElement.clientWidth

  var height = el
    ? el.scrollHeight - el.clientHeight
    : Math.max(document.body.scrollHeight, document.body.clientHeight)

  return {
    width: width,
    height: height
  }
}
