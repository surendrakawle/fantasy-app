import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { Player } from "../../models/Player.model";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fantasy";

async function seedPlayers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    const filePath = path.join(__dirname, "data", "india.json");
    const players = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let created = 0;
    let skipped = 0;

    for (const player of players) {
      const exists = await Player.findOne({
        name: player.name,
        team: player.team,
      });

      if (exists) {
        skipped++;
        continue;
      }

      await Player.create(player);
      created++;
    }

    console.log(`✅ Players seeded: ${created}`);
    console.log(`⚠️ Players skipped (already exist): ${skipped}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Player seed failed", err);
    process.exit(1);
  }
}

seedPlayers();
