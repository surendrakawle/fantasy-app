import mongoose from "mongoose";
import { Role } from "../models/Role.model";
import { env } from "../config/env";

async function seed() {
  await mongoose.connect(env.MONGO_URI);

  await Role.insertMany([
    { name: "ADMIN", permissions: ["ALL"] },
    { name: "MODERATOR", permissions: ["CREATE_MATCH", "CREATE_CONTEST"] },
    { name: "USER", permissions: [] }
  ]);

  console.log("✅ Seed data inserted");
  process.exit(0);
}

seed();
