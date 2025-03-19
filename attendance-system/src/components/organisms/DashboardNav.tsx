import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css"; // ✅ スタイル適用

const DashboardNav: React.FC = () => {
  return (
    <nav className="dashboard-nav">
      <ul>
        <li><Link to="/dashboard">ホーム</Link></li>
        <li><Link to="/profile">プロフィール</Link></li>
        <li><Link to="/settings">設定</Link></li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
