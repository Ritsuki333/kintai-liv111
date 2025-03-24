import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ✅ ユーザーログイン
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log("ログイン成功:", response.data); // ✅ デバッグログ
        return response.data;
    } catch (error: any) {
        console.error("ログインエラー:", error);
        throw error.response?.data || { message: "ログインに失敗しました。" };
    }
};

// ✅ 認証済みユーザー情報取得
export const getMe = async (token: string) => {
    try {
        if (!token) {
            throw new Error("認証トークンがありません");
        }

        console.log("認証リクエスト送信:", token); // ✅ デバッグログ
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("取得したユーザー情報:", response.data); // ✅ デバッグログ
        return response.data;
    } catch (error: any) {
        console.error("ユーザー情報取得エラー:", error);
        
        if (error.response?.status === 403) {
            throw new Error("アクセスが拒否されました。ログインし直してください。");
        }

        throw new Error(error.response?.data?.message || "ユーザー情報の取得に失敗しました。");
    }
};
