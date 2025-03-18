import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";

const LoginSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token); // 🔹トークンを保存
      navigate("/dashboard"); // 🔹ログイン成功後にダッシュボードへ遷移
    } catch (error: unknown) {
      let errorMessage = "ログインエラー";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = String(error.message);
      }
      alert(errorMessage);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginSection;
