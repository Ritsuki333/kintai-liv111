import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { PrismaClient } from "@prisma/client";

// 環境変数の読み込み
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // JSONデータのパース

// ルート設定
app.use("/api/auth", authRoutes); // 🔹 認証関連のルートを適用

// デフォルトルート（動作確認用）
app.get("/", (req, res) => {
  res.send("🚀 バックエンドAPIが起動しています！");
});

// サーバー起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);

  try {
    await prisma.$connect(); // 🔹 データベース接続確認
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
});
