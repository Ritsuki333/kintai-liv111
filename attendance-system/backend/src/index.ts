import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler"; // ✅ 追加！
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use(errorHandler); // ✅ 統一エラーハンドラーを適用！

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
