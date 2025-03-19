import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";
import UserTopNav from "../../components/organisms/UserTopNav";  


const UserTopPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
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
        setUser(userData);
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました");
        console.error(err);
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
      <h1>勤怠管理システム</h1>
      <h2>TOPページ</h2>
      {user && <p>ようこそ、{user.name}さん！</p>}
      <UserTopNav onLogout={handleLogout} />
    </div>
  );
};

export default UserTopPage;
