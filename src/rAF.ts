/**
 * useRequestAnimationFrame mocks `requestAnimationFrame()` and `cancelAnimationFrame()`.
 */
export function useRequestAnimationFrame() {
  const originalRequestAnimationFrame = window.requestAnimationFrame;
  const originalClearAnimationFrame = window.cancelAnimationFrame;

  let tasks: Array<FrameRequestCallback | null>;

  const requestAnimationFrame = jest.fn(function (cb: FrameRequestCallback) {
    return tasks.push(cb) - 1;
  });
  const clearAnimationFrame = jest.fn(function (id: number) {
    tasks[id] = null;
  });

  beforeEach(() => {
    tasks = [];
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = clearAnimationFrame;
  });

  afterEach(() => {
    requestAnimationFrame.mockClear();
    clearAnimationFrame.mockClear();
    window.requestAnimationFrame = originalRequestAnimationFrame;
    window.cancelAnimationFrame = originalClearAnimationFrame;
  });

  return {
    requestAnimationFrame: requestAnimationFrame,
    clearAnimationFrame: clearAnimationFrame,
    getAnimationFrameTasks() {
      return tasks.filter((t) => t !== null);
    },
    nextFrame(time = 0) {
      const copy = tasks;
      tasks = [];
      for (let i = 0; i < copy.length; i++) {
        const task = copy[i];
        if (task !== null) {
          task(time);
        }
      }
    },
  };
}
