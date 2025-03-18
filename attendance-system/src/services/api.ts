import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // バックエンドのURL

// ✅ ユーザーログイン
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "ログインエラー" };
    }
};

// ✅ 認証済みユーザー情報取得
export const getMe = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "ユーザー情報取得エラー" };
    }
};
