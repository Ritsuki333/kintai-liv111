import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // 🔹 未認証ならログインページへリダイレクト
        return;
      }
      try {
        const userData = await getMe(token);
        if (!userData || !userData.name) {
          throw new Error("取得したユーザー情報が不正です");
        }
        setUser(userData);
      } catch (err: any) {
        setError(err.message || "ユーザー情報の取得に失敗しました");
        console.error("ユーザー情報取得エラー:", err);
        setTimeout(() => navigate("/login"), 2000); // 🔹 2秒後にログインページへ
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>🔄 読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>⚠️ {error}</p>;

  return (
    <div>
      <h1>📌 ダッシュボード</h1>
      {user ? (
        <>
          <p>🎉 ようこそ、<strong>{user.name}</strong> さん！</p>
          <p>📧 メール: {user.email}</p>
        </>
      ) : (
        <p>❌ ユーザー情報を取得できませんでした</p>
      )}
      <button onClick={handleLogout}>🚪 ログアウト</button>
    </div>
  );
};

export default DashboardPage;
