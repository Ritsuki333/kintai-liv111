import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

// ✅ ユーザー登録
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // メールアドレスの重複チェック
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "このメールアドレスは既に使用されています" });
            return;
        }

        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // ユーザー作成
        await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        res.status(201).json({ message: "ユーザー登録成功" });
    } catch (error) {
        res.status(500).json({ message: "サーバーエラー", error });
    }
};

// ✅ ユーザーログイン
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(400).json({ message: "メールアドレスまたはパスワードが正しくありません" });
            return;
        }

        // パスワードを比較
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "メールアドレスまたはパスワードが正しくありません" });
            return;
        }

        // JWT トークン発行
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "サーバーエラー" });
    }
};

// ✅ 認証済みユーザー情報取得
export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true },
        });

        if (!user) {
            res.status(404).json({ message: "ユーザーが見つかりません" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "サーバーエラー" });
    }
};
