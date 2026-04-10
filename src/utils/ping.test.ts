import test from 'node:test';
import assert from 'node:assert';
import { probe, getLowestPing } from './ping.ts';

// We need to mock Image globally for probe tests
const originalImage = globalThis.Image;

test('probe - accepts valid host', async () => {
  // Mock Image just for this test to avoid actual network requests
  class MockImage {
    src = '';
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;

    // Auto-trigger onload when src is set
    setSrc(val: string) {
      this.src = val;
      if (this.onload) setTimeout(() => this.onload!(), 10);
    }
  }

  // Override global Image
  const originalImage = globalThis.Image;
  globalThis.Image = new Proxy(MockImage, {
    construct(target, args) {
      const img = new target();
      return new Proxy(img, {
        set(obj, prop, value) {
          if (prop === 'src') {
            obj.setSrc(value);
            return true;
          }
          (obj as any)[prop] = value;
          return true;
        }
      });
    }
  }) as any;

  try {
    const ping = await probe('do-sti-01.arkaniahost.xyz');
    assert.ok(typeof ping === 'number');
    assert.ok(ping >= 0);
  } finally {
    globalThis.Image = originalImage;
  }
});

test('probe - rejects invalid host', async () => {
  await assert.rejects(
    async () => probe('evil.com'),
    (err) => err === 'Invalid host'
  );

  await assert.rejects(
    async () => probe('https://arkaniahost.xyz'),
    (err) => err === 'Invalid host'
  );

  await assert.rejects(
    async () => probe('do-sti-01.arkaniahost.com'),
    (err) => err === 'Invalid host'
  );
});

test('getLowestPing - returns lowest successful ping', async () => {
  let index = 0;
  const pings = [50, 30, 40, 60]; // first is warmup
  const mockProbe = async () => {
    return pings[index++];
  };

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
