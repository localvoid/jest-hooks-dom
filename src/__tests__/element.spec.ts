import { useHTMLElement } from "../element";

const a = useHTMLElement("div");
const b = useHTMLElement("span", a);

describe("element", () => {
  describe("HTML", () => {
    it("a should be a div element", () => {
      expect(a().tagName).toBe("DIV");
    });

    it("b should be a span element", () => {
      expect(b().tagName).toBe("SPAN");
    });

    it("a should be a child of document.body", () => {
      expect(document.body.firstChild).toBe(a());
    });

    it("b should be a child of a", () => {
      expect(a().firstChild).toBe(b());
    });
  });
});
