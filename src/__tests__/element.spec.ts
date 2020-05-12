import { describe, it, expect } from "@jest/globals";
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

    it("b should be a child of a", () => {
      expect(a().firstChild).toBe(b());
    });
  });
});
