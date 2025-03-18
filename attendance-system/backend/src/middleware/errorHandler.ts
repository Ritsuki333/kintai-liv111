import { Request, Response, NextFunction } from "express";

// 統一エラーハンドラー
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // サーバーログにエラーを記録

  // デフォルトのステータスコードは 500（サーバーエラー）
  let statusCode = err.status || 500;
  let message = err.message || "サーバーエラーが発生しました";

  // Prisma のエラーハンドリング（ユニーク制約エラーなど）
  if (err.code === "P2002") {
    statusCode = 400;
    message = "このメールアドレスは既に登録されています";
  }

  res.status(statusCode).json({ message });
};
