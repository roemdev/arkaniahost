import { describe, it } from 'node:test';
import assert from 'node:assert';
import { safeJsonStringify } from './security.ts';

describe('safeJsonStringify', () => {
  it('should stringify objects normally', () => {
    const data = { foo: 'bar', baz: 123 };
    assert.strictEqual(safeJsonStringify(data), JSON.stringify(data));
  });

  it('should escape < characters', () => {
    const data = { tag: '<script>' };
    const result = safeJsonStringify(data);
    assert.ok(!result.includes('<'));
    assert.ok(result.includes('\\u003c'));
  });

  it('should escape > characters', () => {
    const data = { tag: '</script>' };
    const result = safeJsonStringify(data);
    assert.ok(!result.includes('>'));
    assert.ok(result.includes('\\u003e'));
  });

  it('should escape & characters', () => {
    const data = { text: 'foo & bar' };
    const result = safeJsonStringify(data);
    assert.ok(!result.includes('&'));
    assert.ok(result.includes('\\u0026'));
  });

  it('should escape Unicode line separators', () => {
    const data = { text: '\u2028 and \u2029' };
    const result = safeJsonStringify(data);
    assert.ok(!result.includes('\u2028'));
    assert.ok(!result.includes('\u2029'));
    assert.ok(result.includes('\\u2028'));
    assert.ok(result.includes('\\u2029'));
  });

  it('should prevent basic XSS injection in JSON context', () => {
    const malicious = { title: '</script><script>alert("XSS")</script>' };
    const result = safeJsonStringify(malicious);
    assert.ok(!result.includes('</script>'));
    assert.ok(!result.includes('<script>'));
  });
});
