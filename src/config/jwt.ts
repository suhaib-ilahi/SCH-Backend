import { configDotenv } from "dotenv";

// Ensure env vars are loaded (safe even if called multiple times)
configDotenv();

export const JWT_SECRET_KEY =
  process.env.JWT_SECRET || "development-jwt-secret";


