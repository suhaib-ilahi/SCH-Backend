import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      admin: boolean;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
export {};
