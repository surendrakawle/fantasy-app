import fs from "fs";
import path from "path";
import { League } from "../../models/League.model";

export class LeagueSeedService {
  static async seedFromFile(fileName: string) {
    const filePath = path.join(
      process.cwd(),
      "seed/data",
      fileName
    );

    if (!fs.existsSync(filePath)) {
      throw new Error("Seed file not found");
    }

    const leagues = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    );

    let created = 0;
    let skipped = 0;

    for (const league of leagues) {
      const exists = await League.findOne({
        name: league.name,
        season: league.season
      });

      if (exists) {
        skipped++;
        continue;
      }

      await League.create(league);
      created++;
    }

    return { created, skipped };
  }
}
