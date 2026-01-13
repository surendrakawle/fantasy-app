import redis from "../config/redis";

export async function setCache(
  key: string,
  value: any,
  ttl = 60
) {
  await redis.setex(key, ttl, JSON.stringify(value));
}

export async function getCache(key: string) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}
