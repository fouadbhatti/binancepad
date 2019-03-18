class Utils {
  constructor() {}

  fireHtmlEvent(element, eventName, canBubble) {
    if (typeof canBubble === 'undefined') {
      canBubble = false;
    }

    const evt = document.createEvent('HTMLEvents');
    evt.initEvent(eventName, canBubble, true);
    element.dispatchEvent(evt);
  }

  fireGeneralEvent(element, eventName, canBubble) {
    if (typeof canBubble === 'undefined') {
      canBubble = true;
    }

    const evt = document.createEvent('Events');
    evt.initEvent(eventName, canBubble, true);
    element.dispatchEvent(evt);
  }

  fireKeyboardEvent(element, eventName, key) {
    const event = new KeyboardEvent(eventName, { key, bubbles: true });
    element.dispatchEvent(event);
  }

  // simulates mouse event on an element
  simulateMouseEvent(element, eventName) {
    // click function is not preset on all element i.e. anchor tag
    if (element[eventName]) {
      element[eventName]();
    } else {
      const evt = new MouseEvent(eventName, {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      const canceled = !element.dispatchEvent(evt);
      if (canceled) {
        // A handler called preventDefault
        Logger.warn('simulateClick: a handler called preventDefault');
      }
    }
  }

  isElemVisible($elem, checkText = false) {
    return $elem.is(':visible') && $elem.css('visibility') !== 'hidden' && $elem[0].offsetHeight > 0 && $elem[0].offsetWidth > 0 && (!checkText || $elem.text().length > 0);
  }

  simulateTextInput($elem, text) {
    const elem = $elem[0];
    $elem.val(text);
    // some sites actually listen for change,keydown,keyup,keypress events to change the coupon code
    // internally (for example rei.com, colehaan.com), so we need to fire these events after
    // changing text
    this.fireKeyboardEvent(elem, 'keydown', 97);
    this.fireKeyboardEvent(elem, 'keypress', 97);

    $elem.val(text);
    this.fireGeneralEvent(elem, 'input', true);
    this.fireHtmlEvent(elem, 'change', true);
    this.fireKeyboardEvent(elem, 'keyup', 97);
  }

  // simulates click on an element
  simulateClick(element) {
    element.focus();
    this.simulateMouseEvent(element, 'mousedown');
    this.simulateMouseEvent(element, 'mouseup');
    this.simulateMouseEvent(element, 'click');
  }

  onElementArrive(selector) {
    const p = new Promise((resolve) => {
      document.arrive(selector, { existing: true, onceOnly: true, fireOnAttributesModification:true }, (el) => {
        resolve(el);
      });
    });

    return Rx.Observable.fromPromise(p);
  }
}
const utils = new Utils();