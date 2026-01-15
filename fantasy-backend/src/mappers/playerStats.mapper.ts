export const mapPlayerStats = (stats: any) => ({
    id: stats._id,
    matchId: stats.matchId,
    playerId: stats.playerId,
    runs: stats.runs,
    wickets: stats.wickets,
    catches: stats.catches,
    createdAt: stats.createdAt
  });
  