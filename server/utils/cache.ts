/**
 * Универсальный helper для кэширования данных через Nitro storage
 */
export async function getOrSetCache<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const storage = useStorage("cache");

  const cached = await storage.getItem<T>(key);
  if (cached !== null && cached !== undefined) {
    return cached;
  }

  const data = await fetcher();

  await storage.setItem(key, data as unknown as string, {
    ttl,
  });

  return data;
}
