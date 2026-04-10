import { test } from 'node:test';
import assert from 'node:assert';
import { safeJsonStringify } from './security.ts';

test('safeJsonStringify escapes dangerous characters', () => {
  const input = {
    title: 'Hello <script>alert("XSS")</script>',
    description: 'This & that',
    content: 'Line 1\u2028Line 2',
    other: 'More > less'
  };

  const result = safeJsonStringify(input);

  assert.strictEqual(result.includes('<'), false, 'Should not contain <');
  assert.strictEqual(result.includes('>'), false, 'Should not contain >');
  assert.strictEqual(result.includes('&'), false, 'Should not contain &');
  assert.strictEqual(result.includes('\u2028'), false, 'Should not contain U+2028');

  assert.strictEqual(result.includes('\\u003c'), true, 'Should contain \\u003c');
  assert.strictEqual(result.includes('\\u003e'), true, 'Should contain \\u003e');
  assert.strictEqual(result.includes('\\u0026'), true, 'Should contain \\u0026');
  assert.strictEqual(result.includes('\\u2028'), true, 'Should contain \\u2028');

  // Verify it is still valid JSON
  const parsed = JSON.parse(result);
  assert.deepStrictEqual(parsed, input, 'Parsed JSON should match input');
});
