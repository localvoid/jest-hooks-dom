export function useDOMMutationTracker() {
  const originalDocumentCreateElement = Document.prototype.createElement;
  const originalDocumentCreateElementNS = Document.prototype.createElementNS;
  const originalDocumentCreateTextNode = Document.prototype.createTextNode;
  const originalNodeAppendChild = Node.prototype.appendChild;
  const originalNodeInsertBefore = Node.prototype.insertBefore;
  const originalNodeReplaceChild = Node.prototype.replaceChild;
  const originalNodeRemoveChild = Node.prototype.removeChild;
  const originalNodeTextContent = Object.getOwnPropertyDescriptor(Node.prototype, "textContent")!;
  const originalNodeValue = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue")!;
  const originalElementInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML")!;

  const documentCreateElement = jest.fn(originalDocumentCreateElement);
  const documentCreateElementNS = jest.fn(originalDocumentCreateElementNS);
  const documentCreateTextNode = jest.fn(originalDocumentCreateTextNode);
  const nodeAppendChild = jest.fn(originalNodeAppendChild);
  const nodeInsertBefore = jest.fn(originalNodeInsertBefore);
  const nodeReplaceChild = jest.fn(originalNodeReplaceChild);
  const nodeRemoveChild = jest.fn(originalNodeRemoveChild);
  const nodeSetTextContent = jest.fn(originalNodeTextContent.set!);
  const nodeSetNodeValue = jest.fn(originalNodeValue.set!);
  const elementSetInnerHTML = jest.fn(originalElementInnerHTML.set!);

  beforeEach(() => {
    Document.prototype.createElement = documentCreateElement;
    Document.prototype.createElementNS = documentCreateElementNS as any;
    Document.prototype.createTextNode = documentCreateTextNode;
    Node.prototype.appendChild = nodeAppendChild;
    Node.prototype.insertBefore = nodeInsertBefore;
    Node.prototype.replaceChild = nodeReplaceChild;
    Node.prototype.removeChild = nodeRemoveChild;
    Object.defineProperty(Node.prototype, "textContent", {
      get() {
        return originalNodeTextContent.get!.apply(this);
      },
      set: nodeSetTextContent,
    });
    Object.defineProperty(Node.prototype, "nodeValue", {
      get() {
        return originalNodeValue.get!.apply(this);
      },
      set: nodeSetNodeValue,
    });
    Object.defineProperty(Element.prototype, "innerHTML", {
      get() {
        return originalElementInnerHTML.get!.apply(this);
      },
      set: elementSetInnerHTML,
    });
  });

  afterEach(() => {
    documentCreateElement.mockClear();
    documentCreateElementNS.mockClear();
    documentCreateTextNode.mockClear();
    nodeAppendChild.mockClear();
    nodeInsertBefore.mockClear();
    nodeReplaceChild.mockClear();
    nodeRemoveChild.mockClear();
    nodeSetTextContent.mockClear();
    nodeSetNodeValue.mockClear();
    elementSetInnerHTML.mockClear();

    Document.prototype.createElement = originalDocumentCreateElement;
    Document.prototype.createElementNS = originalDocumentCreateElementNS;
    Document.prototype.createTextNode = originalDocumentCreateTextNode;
    Node.prototype.appendChild = originalNodeAppendChild;
    Node.prototype.insertBefore = originalNodeInsertBefore;
    Node.prototype.replaceChild = originalNodeReplaceChild;
    Node.prototype.removeChild = originalNodeRemoveChild;
    Object.defineProperty(Node.prototype, "textContent", originalNodeTextContent);
    Object.defineProperty(Node.prototype, "nodeValue", originalNodeValue);
    Object.defineProperty(Element.prototype, "innerHTML", originalElementInnerHTML);
  });

  return {
    documentCreateElement,
    documentCreateElementNS,
    documentCreateTextNode,
    nodeAppendChild,
    nodeInsertBefore,
    nodeReplaceChild,
    nodeRemoveChild,
    nodeSetTextContent,
    nodeSetNodeValue,
    elementSetInnerHTML,

    stats() {
      return {
        documentCreateElement: documentCreateElement.mock.calls.length,
        documentCreateElementNS: documentCreateElementNS.mock.calls.length,
        documentCreateTextNode: documentCreateTextNode.mock.calls.length,
        nodeAppendChild: nodeAppendChild.mock.calls.length,
        nodeInsertBefore: nodeInsertBefore.mock.calls.length,
        nodeReplaceChild: nodeReplaceChild.mock.calls.length,
        nodeRemoveChild: nodeRemoveChild.mock.calls.length,
        nodeSetTextContent: nodeSetTextContent.mock.calls.length,
        nodeSetNodeValue: nodeSetNodeValue.mock.calls.length,
        elementSetInnerHTML: elementSetInnerHTML.mock.calls.length,
      };
    },
  };
}
