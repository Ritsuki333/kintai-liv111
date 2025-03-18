import express from "express";
import { register, login, getMe } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware"; // 修正済み！

const router = express.Router();

// ✅ ユーザー登録
router.post("/register", register);

// ✅ ログイン
router.post("/login", login);

// ✅ 認証済みユーザー情報取得
router.get("/me", authenticateToken, getMe);

export default router;
