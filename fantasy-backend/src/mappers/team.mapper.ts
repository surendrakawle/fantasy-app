import { ITeam } from "../models/Team.model";

export const mapTeam = (team: ITeam) => ({
  id: team._id.toString(),
  name: team.name,
  shortName: team.shortName,
  code: team.code,
  logoBase64: team.logoBase64,
  logo: team.logo,
  isNational: team.isNational,
  isActive: team.isActive,
  createdAt: team.createdAt
});
