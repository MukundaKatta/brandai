import { describe, it, expect } from "vitest";
import { Brandai } from "../src/core.js";
describe("Brandai", () => {
  it("init", () => { expect(new Brandai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Brandai(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Brandai(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
