// Tiny in-memory TTL cache + fetch helper.
//
// Per the architecture: never call agency APIs from the browser. These helpers
// run server-side only, cache responses per source TTL, and hide any keys.
// (In production this would be Redis/Upstash; in-memory is fine for the MVP.)

type Entry = { value: unknown; expires: number };

const store = new Map<string, Entry>();

export async function cached<T>(
  key: string,
  ttlSeconds: number,
  loader: () => Promise<T>
): Promise<T> {
  const hit = store.get(key);
  if (hit && hit.expires > Date.now()) {
    return hit.value as T;
  }
  try {
    const value = await loader();
    store.set(key, { value, expires: Date.now() + ttlSeconds * 1000 });
    return value;
  } catch (err) {
    // Serve stale data on upstream failure rather than breaking the page.
    if (hit) return hit.value as T;
    throw err;
  }
}

export async function fetchJSON<T>(
  url: string,
  init?: RequestInit & { revalidate?: number }
): Promise<T> {
  const { revalidate, ...rest } = init ?? {};
  const res = await fetch(url, {
    ...rest,
    headers: { Accept: "application/json", ...(rest.headers ?? {}) },
    // Next.js fetch caching layer (defense in depth alongside `cached`).
    next: revalidate ? { revalidate } : undefined,
  });
  if (!res.ok) {
    throw new Error(`Upstream ${res.status} for ${url}`);
  }
  return (await res.json()) as T;
}

export const NASA_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
