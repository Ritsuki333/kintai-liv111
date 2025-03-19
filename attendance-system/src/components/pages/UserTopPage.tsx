import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";
import UserTopNav from "../../components/organisms/UserTopNav";
import MainTemplate from "../../components/templates/MainTemplate";

const UserTopPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const userData = await getMe(token);
        setUser(userData);
      } catch (error) {
        console.error("ユーザー情報取得エラー:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <MainTemplate>
      <h1>ダッシュボード</h1> {/* ✅ 表示名を統一 */}
      {user && <p>ようこそ、{user.name}さん！</p>}
      <UserTopNav />
    </MainTemplate>
  );
};

export default UserTopPage;
