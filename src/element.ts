/**
 * useHTMLElement creates a HTML element and optionally mounts it to the container.
 *
 * @example
 *
 *     const e = useHTMLElement();
 *     it("should create div element", () => {
 *       expect(e().tagName).toBe("DIV");
 *     });
 *
 * @param element Tag name to create or HTML element to clone.
 * @param container Mount element to the container.
 * @returns HTML element getter function.
 */
export function useHTMLElement<T extends HTMLElement>(
  element: T | string = "div",
  container?: () => Element,
): () => T {
  let e: T;

  beforeEach(() => {
    e = (typeof element === "string") ?
      document.createElement(element) as T :
      element.cloneNode(true) as T;
    if (container !== void 0) {
      container().appendChild(e);
    }
  });

  afterEach(() => {
    e.remove();
  });

  return () => e;
}

/**
 * useSVGElement creates a HTML element and optionally mounts it to the container.
 *
 * @example
 *
 *     const e = useSVGElement();
 *     it("should create SVG element", () => {
 *       expect(e().tagName).toBe("SVG");
 *     });
 *
 * @param element Tag name to create or SVG element to clone.
 * @param container Mount element to the container.
 * @returns SVG element getter function.
 */
export function useSVGElement<T extends SVGElement>(
  element: T | string = "svg",
  container?: () => Element,
): () => T {
  let e: T;

  beforeEach(() => {
    e = (typeof element === "string") ?
      document.createElementNS("http://www.w3.org/2000/svg", element) as T :
      element.cloneNode(true) as T;
    if (container !== void 0) {
      container().appendChild(e);
    }
  });

  afterEach(() => {
    e.remove();
  });

  return () => e;
}
