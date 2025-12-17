import type { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authenticated, token not present" });
  }

  // For this app, any existing token cookie is treated as a valid admin session
  (req as any).user = { admin: true };
    next();
};

export { verifyToken };
