export class TeamService {
    static async createTeam(payload: any) {
      if (payload.players.length !== 11) {
        throw new Error("Team must have 11 players");
      }
  
      const credits = payload.players.reduce(
        (sum: number, p: any) => sum + p.credit,
        0
      );
  
      if (credits > 100) {
        throw new Error("Credit limit exceeded");
      }
  
      const captains = payload.players.filter(p => p.isCaptain);
      const vice = payload.players.filter(p => p.isViceCaptain);
  
      if (captains.length !== 1 || vice.length !== 1) {
        throw new Error("Captain and Vice Captain required");
      }
  
      return UserTeam.create(payload);
    }
  }
  