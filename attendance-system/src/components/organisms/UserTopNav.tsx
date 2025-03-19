import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const UserTopNav: React.FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/attendance")}>勤怠打刻</button>
      <button onClick={() => navigate("/attendance-info")}>勤怠情報確認</button>
      <button onClick={onLogout}>ログアウト</button>
    </nav>
  );
};

export default UserTopNav;
