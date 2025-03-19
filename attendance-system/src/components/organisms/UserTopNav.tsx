import React from "react";
import { useNavigate } from "react-router-dom";

const UserTopNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/attendance")}>勤怠打刻</button>
      <button onClick={() => navigate("/attendance-info")}>勤怠情報確認</button>
      <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>ログアウト</button>
    </nav>
  );
};

export default UserTopNav;
