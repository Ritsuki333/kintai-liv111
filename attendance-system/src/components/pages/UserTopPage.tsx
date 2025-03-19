import React from "react";
import { useNavigate } from "react-router-dom";
import UserTopNav from "../organisms/UserTopNav";

const UserTopPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔹 トークン削除
    navigate("/login"); // 🔹 ログインページへ遷移
  };

  return (
    <div>
      <h1>勤怠管理システム</h1>
      <h2>TOPページ</h2>
      <UserTopNav onLogout={handleLogout} />
    </div>
  );
};

export default UserTopPage;
