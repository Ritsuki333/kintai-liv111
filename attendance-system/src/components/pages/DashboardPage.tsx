import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // 🔹 トークンが無い場合はログインページへ
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔹ログアウト時にトークンを削除
    navigate("/login"); // 🔹ログアウト後にログインページへ移動
  };

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ログイン成功！</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default DashboardPage;
