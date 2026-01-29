import { Player } from "../models/Player.model";
import { League } from "../models/League.model";
import { Team } from "../models/Team.model";
// add more models here

export const SeedRegistry: Record<string, any> = {
  Player,
  League,
  Team
};
