import redis from "../config/redis";

const leaderboardKey = (contestId: string) =>
  `leaderboard:${contestId}`;

export class LeaderboardService {
  /* -------------------- ADD / UPDATE SCORE -------------------- */
  static async addScore(
    contestId: string,
    userId: string,
    score: number
  ) {
    if (!contestId || !userId) {
      throw new Error("Invalid leaderboard params");
    }

    await redis.zadd(
      leaderboardKey(contestId),
      score,
      userId
    );
  }

  /* -------------------- GET TOP USERS -------------------- */
  static async getTopUsers(
    contestId: string,
    limit = 10
  ) {
    if (!contestId) {
      throw new Error("contestId is required");
    }

    const raw = await redis.zrevrange(
      leaderboardKey(contestId),
      0,
      limit - 1,
      "WITHSCORES"
    );

    return raw;
  }

  /* -------------------- GET USER RANK -------------------- */
  static async getUserRank(
    contestId: string,
    userId: string
  ) {
    const rank = await redis.zrevrank(
      leaderboardKey(contestId),
      userId
    );

    return rank !== null ? rank + 1 : null;
  }
}
