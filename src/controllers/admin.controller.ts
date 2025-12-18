import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHanler.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import { JWT_SECRET_KEY } from "../config/jwt.js";

const setSetting = asyncHandler((req: Request, res: Response) => {
  const setting = {
    bannerTitle: "Super Cloth House",
    bannerSubtitle: "Exquisite Elegance · Timeless Tradition",
    whatsappNumber: "939743473047",
  };
  res.json(new ApiResponse(200, setting, "Setting sent successfully!"));
});
const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const password = req.body.password;
  console.log("In the login handler", password);
  if (!password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Password is required"));
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json(new ApiResponse(401, null, "Invalid password"));
  }
  // Generate JWT
  const token = jwt.sign({ admin: true }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  // Send token as HTTP-only cookie
  res
    .cookie("token", token, {
      httpOnly: true,
      // Ports 3000 and 5174 are same-site on localhost, so lax works
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .status(200)
    .json(new ApiResponse(200, null, "Logged in successfully"));
});

const logoutAdmin = asyncHandler(async (req: Request, res: Response) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
export { loginAdmin, logoutAdmin, setSetting };
