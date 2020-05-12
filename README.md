<p align="center">
  <img width="507" height="351" src="https://localvoid.github.io/jest-hooks-dom/example.png">
</p>

`jest-hooks-dom` is a collection of [hooks](https://github.com/localvoid/jest-hooks) for DOM testing with
[Jest](https://jestjs.io/) library.

## Hooks

### Elements

`useHTMLElement(element, container)` creates a new HTML element before each test and optionally mounts it to the
container. After each test HTML element is removed from container.

`useSVGElement(element, container)` creates a new SVG element before each test and optionally mounts it to the
container. After each test SVG element is removed from container.

`useHTMLTemplate(html, container)` create a new HTML from template before each test and optionally mounts it to the
container. After each test all root nodes are removed from container.

```js
const t = useHTMLTemplate(`
  <div>
    <span id="a">A</span>
    <span id="b">B</span>
  </div>
`);

describe("template", () => {
  it("should find all nodes by id", () => {
    expect(t.a.textContent).toBe("A");
    expect(t.b.textContent).toBe("B");
  });
});
```

### Mutation Tracking

`useDOMMutationTracker()` tracks DOM mutations.

Methods and properties tracked:

 - `Document.prototype.createElement`
 - `Document.prototype.createElementNS`
 - `Document.prototype.createTextNode`
 - `Node.prototype.appendChild`
 - `Node.prototype.insertBefore`
 - `Node.prototype.replaceChild`
 - `Node.prototype.removeChild`
 - `Node.prototype.textContent`
 - `Node.prototype.nodeValue`
 - `Element.prototype.innerHTML`

### Events

`useResetDOMEventListeners()` tracks all unregistered event listeners and automatically removes them after each test.

### requestAnimationFrame

`useRequestAnimationFrame()` mocks `requestAnimationFrame()` and `cancelAnimationFrame()`, and resets all tasks after
each test.
