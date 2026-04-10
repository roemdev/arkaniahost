import test from 'node:test';
import assert from 'node:assert';
import { getLowestPing } from './ping.ts';

test('getLowestPing - returns lowest successful ping', async () => {
  const pings = [50, 30, 40, 60]; // first is warmup
  let index = 0;
  const mockProbe = async () => pings[index++];

  const result = await getLowestPing('node-01.arkaniahost.xyz', mockProbe);

  assert.strictEqual(result, 30);
  assert.strictEqual(index, 4);
});

test('getLowestPing - handles mixed success and failure', async () => {
  let index = 0;
  const mockProbe = async () => {
    index++;
    if (index === 1) return 50; // warmup
    if (index === 2) return 100;
    if (index === 3) throw new Error('timeout');
    if (index === 4) return 80;
    return 999;
  };

  const result = await getLowestPing('node-01.arkaniahost.xyz', mockProbe);

  assert.strictEqual(result, 80);
});

test('getLowestPing - handles all failures after warmup', async () => {
  let index = 0;
  const mockProbe = async () => {
    index++;
    if (index === 1) return 50; // warmup success
    throw new Error('timeout');
  };

  const result = await getLowestPing('node-01.arkaniahost.xyz', mockProbe);

  assert.strictEqual(result, 999);
});

test('probe - rejects invalid hosts', async () => {
  const { probe } = await import('./ping.ts');

  const invalidHosts = [
    'google.com',
    'arkaniahost.xyz.evil.com',
    'attacker.com/arkaniahost.xyz',
    'arkaniahost.xyz@attacker.com',
    'sub.domain.arkaniahost.xyz', // only one level allowed by current regex
    '-invalid.arkaniahost.xyz',
    'valid.arkaniahost.xyz/path',
    'arkaniahost.xyz',
  ];

  for (const host of invalidHosts) {
    try {
      const p = probe(host);
      await p;
      assert.fail(`Should have rejected host: ${host}`);
    } catch (e: any) {
      if (e.message === 'Image is not defined') {
        assert.fail(`Host should have been caught by regex but triggered Image error: ${host}`);
      }
      assert.strictEqual(e.message, 'Invalid host', `Expected 'Invalid host' for ${host}, got ${e.message}`);
    }
  }
});

test('probe - accepts valid hosts', async () => {
  const { probe } = await import('./ping.ts');

  const validHosts = [
    'do-sti-01.arkaniahost.xyz',
    'us-abe-01.arkaniahost.xyz',
    'node-1.arkaniahost.xyz',
  ];

  // We can't easily execute probe in Node because of Image,
  // but we can check that it doesn't fail the regex check.
  // Since Image is not defined, it should throw ReferenceError if it passes the regex.
  for (const host of validHosts) {
    try {
        await probe(host);
    } catch (e: any) {
        assert.notStrictEqual(e.message, 'Invalid host');
        assert.strictEqual(e instanceof ReferenceError, true);
    }
  }
});

test('getLowestPing - handles warmup failure', async () => {
  let index = 0;
  const mockProbe = async () => {
    index++;
    if (index === 1) throw new Error('warmup fail');
    return 100;
  };

  const result = await getLowestPing('node-01.arkaniahost.xyz', mockProbe);

  assert.strictEqual(result, 100);
  assert.strictEqual(index, 4);
});

test('getLowestPing - handles total failure', async () => {
  const mockProbe = async () => {
    throw new Error('fail');
  };

  const result = await getLowestPing('node-01.arkaniahost.xyz', mockProbe);

  assert.strictEqual(result, 999);
});
