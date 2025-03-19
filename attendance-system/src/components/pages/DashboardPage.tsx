import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";
import DashboardNav from "../organisms/DashboardNav";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/login"); // 🔹 未認証ならログインページへ
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getMe(token);
        setUser(userData);
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました");
        console.error(err);
        navigate("/login"); // 🔹 取得エラー時はログイン画面へ
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate]); // ✅ `token` を依存配列に含める

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <DashboardNav />
      <div style={{ padding: "20px" }}>
        <h1>ダッシュボード</h1>
        {user && (
          <>
            <p>ようこそ、{user.name}さん！</p>
            <p>メール: {user.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
