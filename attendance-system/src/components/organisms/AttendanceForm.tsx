import React, { useState } from "react";
import { clockIn, clockOut } from "../../services/attendanceService";

const AttendanceForm: React.FC = () => {
  const [status, setStatus] = useState("出勤前");
  const [time, setTime] = useState<string | null>(null);

  const handleClockIn = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("ログインしてください");
      const response = await clockIn(token);
      setTime(response);
      setStatus("出勤済み");
    } catch (error) {
      console.error("出勤エラー:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("ログインしてください");
      const response = await clockOut(token);
      setTime(response);
      setStatus("退勤済み");
    } catch (error) {
      console.error("退勤エラー:", error);
    }
  };

  return (
    <div>
      <h2>現在の状態: {status}</h2>
      {time && <p>時刻: {time}</p>}
      {status === "出勤前" && <button onClick={handleClockIn}>出勤</button>}
      {status === "出勤済み" && <button onClick={handleClockOut}>退勤</button>}
    </div>
  );
};

export default AttendanceForm;
