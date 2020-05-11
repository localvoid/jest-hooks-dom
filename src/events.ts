interface DOMEventListener {
  readonly target: EventTarget;
  readonly type: string;
  readonly callback: EventListener | EventListenerObject | null;
  readonly options: boolean | AddEventListenerOptions | undefined;
}

/**
 * useResetDOMEventListeners tracks attached event handlers and removes them after each test.
 */
export function useResetDOMEventListeners() {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

  let listeners: Map<EventTarget, DOMEventListener[]>;

  const addEventListener =
    jest.fn<ReturnType<typeof originalAddEventListener>, Parameters<typeof originalAddEventListener>>(
      function (this: EventTarget, type, callback, options) {
        let list = listeners.get(this);
        if (!list) {
          listeners.set(this, list = []);
        }
        list.push({ target: this, type, callback, options });
        originalAddEventListener.call(this, type, callback, options);
      },
    );
  const removeEventListener =
    jest.fn<ReturnType<typeof originalRemoveEventListener>, Parameters<typeof originalRemoveEventListener>>(
      function (this: EventTarget, type, callback, options) {
        let list = listeners.get(this);
        if (list) {
          const idx = list.findIndex((listener) => (
            listener.type === type &&
            listener.callback === callback &&
            listener.options === options
          ));
          if (idx !== -1) {
            list.splice(idx, 1);
          }
        }
        originalRemoveEventListener.call(this, type, callback, options);
      },
    );

  beforeEach(() => {
    listeners = new Map<EventTarget, DOMEventListener[]>();
    EventTarget.prototype.addEventListener = addEventListener;
    EventTarget.prototype.removeEventListener = removeEventListener;
  });

  afterEach(() => {
    listeners.forEach((list) => {
      for (let i = 0; i < list.length; i++) {
        const l = list[i];
        originalRemoveEventListener.call(l.target, l.type, l.callback, l.options);
      }
    });

    addEventListener.mockClear();
    removeEventListener.mockClear();
    EventTarget.prototype.addEventListener = originalAddEventListener;
    EventTarget.prototype.removeEventListener = originalRemoveEventListener;
  });

  return {
    addEventListener,
    removeEventListener,
  };
}
