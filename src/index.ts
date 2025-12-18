import express from "express";
import { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { verifyToken } from "./middlewares/auth.middleware.js";
configDotenv();

const app: express.Application = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CORS_ORIGIN,
        "http://localhost:5173",
        "https://sch-8fbprpnjz-suhaibelahi87-gmailcoms-projects.vercel.app",
        "https://sch-ebon.vercel.app",
        "http://localhost:5174",
      ].filter(Boolean) as string[];

      // Allow non-browser tools (no origin) and allowed frontend origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

import productRouter from "./routes/product.route.js";
import adminRouter from "./routes/admin.route.js";
import connectDB from "./db/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

connectDB()
  .then(() => {
// routes
app.use("/user", productRouter);
app.use("/admin", verifyToken, adminRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
});
