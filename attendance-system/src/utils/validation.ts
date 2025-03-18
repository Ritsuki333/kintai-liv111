import * as yup from "yup";

// メールアドレスのバリデーション
export const emailValidation = yup
  .string()
  .email("有効なメールアドレスを入力してください")
  .required("メールアドレスは必須です");

// パスワードのバリデーション
export const passwordValidation = yup
  .string()
  .min(8, "パスワードは8文字以上で入力してください")
  .max(20, "パスワードは20文字以内で入力してください")
  .matches(/^[a-zA-Z0-9!@#$%^&*()_+]+$/, "半角英数字または記号を使用してください")
  .required("パスワードは必須です");

// フォーム全体のスキーマ
export const loginSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
});
