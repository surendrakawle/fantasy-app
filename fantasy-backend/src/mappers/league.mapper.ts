import { ILeague } from "../models/League.model";

export const mapLeague = (league: ILeague) => ({
  id: league._id.toString(),
  name: league.name,
  shortName: league.shortName,
  sport: league.sport,
  season: league.season,
  isActive: league.isActive,
  createdAt: league.createdAt
});
