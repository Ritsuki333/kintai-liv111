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
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // ✅ 未認証ならログインページへ
          return;
        }
        const userData = await getMe(token);
        if (!user) { // ✅ ユーザー情報が取得済みなら再取得しない
          setUser(userData);
        }
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!user) { // ✅ 初回のみ実行
      fetchUser();
    }
  }, [user]); // ✅ `user` を依存配列に追加して、無限ループを防ぐ

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ ログアウト時にトークン削除
    navigate("/login");
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>ダッシュボード</h1>
      {user && (
        <>
          <p>ようこそ、{user.name}さん！</p>
          <p>メール: {user.email}</p>
        </>
      )}
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default DashboardPage;
