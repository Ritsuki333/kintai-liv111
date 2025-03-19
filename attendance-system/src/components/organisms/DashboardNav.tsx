import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardNav: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ background: "#333", padding: "10px", color: "#fff" }}>
      <h2>ダッシュボード</h2>
      <button onClick={handleLogout} style={{ marginLeft: "20px" }}>ログアウト</button>
    </nav>
  );
};

export default DashboardNav;
