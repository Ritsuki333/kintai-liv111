import express, { Request, Response, NextFunction } from "express";
import { register, login, getMe } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

// ✅ `RequestHandler` を削除し、`authenticateToken` を通常のミドルウェアとして使用
router.get("/me", authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getMe(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
