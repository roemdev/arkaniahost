export function probe(host: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const validHostRegex = /^(?!-)[a-z0-9-]{1,63}(?<!-)\.arkaniahost\.xyz$/;
    if (!validHostRegex.test(host)) {
      return reject("Invalid host");
    }

    const start = Date.now();
    const img = new Image();
    const timeout = setTimeout(() => reject("timeout"), 3000);

    img.onload = () => { clearTimeout(timeout); resolve(Date.now() - start); };
    img.onerror = () => { clearTimeout(timeout); resolve(Date.now() - start); };

    img.src = `https://${host}/favicon.ico?t=${start}`;
  });
}

export async function getLowestPing(host: string, probeFn = probe) {
  // Warmup
  await probeFn(host).catch(() => {});

  const promises = Array.from({ length: 3 }, () => probeFn(host).catch(() => 999));
  const results = await Promise.all(promises);
  return Math.min(...results);
}
