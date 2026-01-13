import mongoose from "mongoose";
import { Role } from "../models/Role.model";
import { env } from "../config/env";

async function seedRoles() {
  await mongoose.connect(env.MONGO_URI);

  await Role.insertMany([
    {
      name: "ADMIN",
      permissions: ["ALL"]
    },
    {
      name: "MODERATOR",
      permissions: ["CREATE_MATCH", "CREATE_CONTEST", "CREATE_PREDICTION"]
    },
    {
      name: "USER",
      permissions: []
    }
  ]);

  console.log("✅ Roles seeded");
  process.exit(0);
}

seedRoles();
