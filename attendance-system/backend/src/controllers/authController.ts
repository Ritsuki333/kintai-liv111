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
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "ユーザー登録成功" });
    return;
  } catch (error) {
    res.status(400).json({ message: "ユーザー登録エラー", error });
    return;
  }
};

// ✅ ログイン
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "メールアドレスが存在しません" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "パスワードが間違っています" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, user });
    return;
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
    return;
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
    return;
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
    return;
  }
};
