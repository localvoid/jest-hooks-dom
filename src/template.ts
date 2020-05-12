import { createMutableProxy } from "jest-hooks";

function isElementNode(node: ChildNode): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}

function accumulateNodesWithIDs(node: ChildNode, result: Record<string, Node>): void {
  if (isElementNode(node)) {
    if (node.id) {
      result[node.id] = node;
    }
    let child = node.firstChild;
    while (child) {
      accumulateNodesWithIDs(child, result);
      child = child.nextSibling;
    }
  }
}

/**
 * useHTMLTemplate
 *
 * @example
 *
 *     const t = useHTMLTemplate(`
 *       <div>
 *         <span id="a">A</span>
 *         <span id="b">B</span>
 *       </div>
 *     `);
 *     expect(t.a.textContent).toBe("A");
 *     expect(t.b.textContent).toBe("B");
 *
 *
 * @param html HTML template.
 * @param getContainer Container getter function.
 */
export function useHTMLTemplate<T extends Record<string, Node> = Record<string, Node>>(
  html: string,
  getContainer?: () => Element,
): T {
  const root = document.createElement("div");
  let [nodeByIds, setNodeByIds] = createMutableProxy<T>();
  let rootNodes: ChildNode[];

  beforeEach(() => {
    const container = getContainer ? getContainer() : null;
    root.innerHTML = html;
    rootNodes = [];
    setNodeByIds({} as T);
    accumulateNodesWithIDs(root, nodeByIds);

    let child = root.firstChild;
    while (child) {
      rootNodes.push(child);
      if (container) {
        container.appendChild(child);
      }
      child = child.nextSibling;
    }
  });

  afterEach(() => {
    for (let i = 0; i < rootNodes.length; i++) {
      rootNodes[i].remove();
    }
  });

  return nodeByIds;
}
