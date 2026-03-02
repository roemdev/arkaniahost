import test from 'node:test';
import assert from 'node:assert';
import { getLowestPing } from './ping.ts';

test('getLowestPing - returns lowest successful ping', async () => {
  const pings = [50, 30, 40, 60]; // first is warmup
  let index = 0;
  const mockProbe = async () => pings[index++];

  const result = await getLowestPing('host', mockProbe);

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

  const result = await getLowestPing('host', mockProbe);

  assert.strictEqual(result, 80);
});

test('getLowestPing - handles all failures after warmup', async () => {
  let index = 0;
  const mockProbe = async () => {
    index++;
    if (index === 1) return 50; // warmup success
    throw new Error('timeout');
  };

  const result = await getLowestPing('host', mockProbe);

  assert.strictEqual(result, 999);
});

test('getLowestPing - handles warmup failure', async () => {
  let index = 0;
  const mockProbe = async () => {
    index++;
    if (index === 1) throw new Error('warmup fail');
    return 100;
  };

  const result = await getLowestPing('host', mockProbe);

  assert.strictEqual(result, 100);
  assert.strictEqual(index, 4);
});

test('getLowestPing - handles total failure', async () => {
  const mockProbe = async () => {
    throw new Error('fail');
  };

  const result = await getLowestPing('host', mockProbe);

  assert.strictEqual(result, 999);
});
