export const mapUserTeam = (team: any) => ({
    id: team._id,
    contestId: team.contestId,
    matchId: team.matchId,
    players: team.players.map((p: any) => ({
      playerId: p.playerId,
      isCaptain: p.isCaptain,
      isViceCaptain: p.isViceCaptain
    })),
    totalCredits: team.totalCredits,
    createdAt: team.createdAt
  });
  