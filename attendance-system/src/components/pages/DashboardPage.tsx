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
      console.log("取得したトークン:", token); // ✅ トークンのデバッグ出力

      if (!token) {
        console.warn("トークンが存在しないため、ログインページへ遷移");
        navigate("/login");
        return;
      }

      try {
        const userData = await getMe(token);
        setUser(userData);
      } catch (err: any) {
        console.error("ユーザー情報取得エラー:", err.message);
        setError(err.message);

        // ✅ 403エラーならトークン削除してログインページへリダイレクト
        if (err.message.includes("アクセスが拒否されました")) {
          localStorage.removeItem("token");
          navigate("/login");
        }
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

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>ダッシュボード</h1>
      {user ? (
        <>
          <p>ようこそ、{user.name}さん！</p>
          <p>メール: {user.email}</p>
        </>
      ) : (
        <p>ユーザー情報を取得できませんでした。</p>
      )}
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default DashboardPage;
