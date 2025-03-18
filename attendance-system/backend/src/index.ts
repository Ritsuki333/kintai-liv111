import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler"; // ✅ 統一エラーハンドラー
import authRoutes from "./routes/authRoutes";

dotenv.config(); // ✅ 環境変数の読み込み

const app = express();

// ✅ ミドルウェアの設定
app.use(express.json()); // JSON リクエストを解析
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ✅ フロントと通信可能にする
app.use(helmet({ contentSecurityPolicy: false })); // ✅ 開発時のエラー回避
app.use(morgan("dev")); // ✅ リクエストログを出力

// ✅ API ルートの設定
app.use("/api/auth", authRoutes);

// ✅ エラーハンドラーを適用（ルート定義の後に配置）
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
