import fs from "fs";
import path from "path";
import { Player } from "../models/Player.model";

export class PlayerSeedService {
  static async seedFromFile(fileName: string) {
    const filePath = path.join(
      process.cwd(),
      "src/seed/data",
      fileName
    );
     console.log(filePath)
    if (!fs.existsSync(filePath)) {
      throw new Error("Seed file not found");
    }

    const players = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    );

    let created = 0;
    let skipped = 0;

    for (const p of players) {
      const exists = await Player.findOne({
        name: p.name,
        team: p.team,
      });

      if (exists) {
        skipped++;
        continue;
      }

      await Player.create(p);
      created++;
    }

    return { created, skipped };
  }
}
