import { describe, it, expect } from "@jest/globals";
import { useHTMLTemplate } from "../template";

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
