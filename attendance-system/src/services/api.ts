import axios from "axios";

// ✅ Axios インスタンスを作成（共通設定）
const apiClient = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ✅ CORS 対策
});

// ✅ ユーザーログイン
export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post("/login", { email, password });
        return response.data;
    } catch (error: any) {
        console.error("ログインエラー:", error.response?.data || error.message);
        throw error.response?.data || { message: "ログインエラー" };
    }
};

// ✅ 新規登録
export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await apiClient.post("/register", { name, email, password });
        return response.data;
    } catch (error: any) {
        console.error("登録エラー:", error.response?.data || error.message);
        throw error.response?.data || { message: "登録エラー" };
    }
};

// ✅ 認証済みユーザー情報取得
export const getMe = async (token: string) => {
    try {
        const response = await apiClient.get("/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("ユーザー情報取得エラー:", error.response?.data || error.message);
        throw error.response?.data || { message: "ユーザー情報取得エラー" };
    }
};
