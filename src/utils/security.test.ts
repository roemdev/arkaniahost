import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { safeJsonStringify } from "./security.ts";

describe("safeJsonStringify", () => {
  it("should escape <, >, and & characters", () => {
    const payload = { html: "<script>alert('xss & more');</script>" };
    const result = safeJsonStringify(payload);
    assert.match(result, /\\u003cscript\\u003ealert\('xss \\u0026 more'\);\\u003c\/script\\u003e/);
    assert.doesNotMatch(result, /</);
    assert.doesNotMatch(result, />/);
    assert.doesNotMatch(result, /&/);
  });

  it("should escape line separators", () => {
    const payload = { text: "Line 1\u2028Line 2\u2029Line 3" };
    const result = safeJsonStringify(payload);
    assert.match(result, /Line 1\\u2028Line 2\\u2029Line 3/);
    assert.doesNotMatch(result, /\u2028/);
    assert.doesNotMatch(result, /\u2029/);
  });

  it("should be parseable by JSON.parse", () => {
    const payload = {
      nested: {
        text: "<p>Hello & welcome!</p>",
        script: "<script>foo()</script>"
      }
    };
    const stringified = safeJsonStringify(payload);
    const parsed = JSON.parse(stringified);
    assert.deepEqual(parsed, payload);
  });

  it("should handle null and undefined", () => {
    assert.equal(safeJsonStringify(null), "null");
    assert.equal(safeJsonStringify(undefined), undefined);
  });
});
