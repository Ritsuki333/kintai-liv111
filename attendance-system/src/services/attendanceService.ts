import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance"; // ✅ バックエンドのエンドポイントを確認

// ✅ 出勤処理
export const clockIn = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/clock-in`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.time;
  } catch (error: unknown) {
    console.error("出勤処理エラー:", error);
    throw new Error("出勤処理に失敗しました"); // ✅ ESLint 警告修正
  }
};

// ✅ 退勤処理
export const clockOut = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/clock-out`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.time;
  } catch (error: unknown) {
    console.error("退勤処理エラー:", error);
    throw new Error("退勤処理に失敗しました"); // ✅ ESLint 警告修正
  }
};
