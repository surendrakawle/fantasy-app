import redis from "../config/redis";

export function leaderboardKey(contestId: string) {
  return `leaderboard:${contestId}`;
}

export async function addScore(
  contestId: string,
  userId: string,
  score: number
) {
  await redis.zadd(leaderboardKey(contestId), score, userId);
}

export async function getTopUsers(
  contestId: string,
  limit = 10
) {
  return redis.zrevrange(
    leaderboardKey(contestId),
    0,
    limit - 1,
    "WITHSCORES"
  );
}

export async function getUserRank(
  contestId: string,
  userId: string
) {
  const rank = await redis.zrevrank(leaderboardKey(contestId), userId);
  return rank !== null ? rank + 1 : null;
}
