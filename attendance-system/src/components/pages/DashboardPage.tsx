import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";
import DashboardNav from "../../components/organisms/DashboardNav"; 

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
          navigate("/login"); 
          return;
        }
        const userData = await getMe(token);
        
        if (!userData) return; // ✅ 無限ループ防止
        
        setUser(userData);
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // ✅ 依存配列を空にして無限ループを防ぐ

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <DashboardNav /> 
      <div className="dashboard-content">
        <h1>ダッシュボード</h1>
        {user && (
          <>
            <p>ようこそ、{user.name}さん！</p>
            <p>メール: {user.email}</p>
          </>
        )}
        <button onClick={handleLogout} className="logout-btn">ログアウト</button>
      </div>
    </div>
  );
};

export default DashboardPage;
