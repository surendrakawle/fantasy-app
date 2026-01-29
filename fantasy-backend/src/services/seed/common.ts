import fs from "fs";
import path from "path";
import { SeedRegistry } from "../../seed/seedRegistry";

type SeedPayload = {
  file: string;
  model: string;
  uniqueBy?: string[];
};

export class CommonSeedService {
  static async seed({
    file,
    model,
    uniqueBy = []
  }: SeedPayload) {
    const Model = SeedRegistry[model];

    if (!Model) {
      throw new Error("Invalid model name");
    }

    const filePath = path.join(
      process.cwd(),
      "src/seed/data",
      file
    );

    if (!fs.existsSync(filePath)) {
      throw new Error("Seed file not found");
    }

    const records = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    );

    if (!Array.isArray(records)) {
      throw new Error("Seed file must be an array");
    }

    let created = 0;
    let skipped = 0;

    for (const item of records) {
      if (uniqueBy.length > 0) {
        const filter: any = {};
        uniqueBy.forEach(
          (key) => (filter[key] = item[key])
        );

        const exists = await Model.findOne(filter);
        if (exists) {
          skipped++;
          continue;
        }
      }

      await Model.create(item);
      created++;
    }

    return { created, skipped };
  }
}
