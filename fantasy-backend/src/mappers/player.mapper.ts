export const mapPlayer = (player: any) => ({
    id: player._id,
    name: player.name,
    team: player.team,
    role: player.role,
    credit: player.credit,
    isActive: player.isActive
  });
  