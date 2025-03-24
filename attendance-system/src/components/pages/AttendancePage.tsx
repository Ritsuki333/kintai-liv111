import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";
import AttendanceForm from "../organisms/AttendanceForm";

const AttendancePage: React.FC = () => {
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
    <div>
      <h1>勤怠打刻ページ</h1>
      {user && <p>ようこそ、{user.name}さん！</p>}
      <AttendanceForm />
      <button onClick={() => navigate("/top")}>TOPページへ戻る</button>
    </div>
  );
};

export default AttendancePage;
