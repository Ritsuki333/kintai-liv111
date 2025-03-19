import React from "react";
import { useNavigate } from "react-router-dom";
import AuthTemplate from "../templates/AuthTemplate";
import LoginSection from "../organisms/LoginSection";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // ✅ ログイン済みならダッシュボードへ
    }
  }, [navigate]);

  return (
    <AuthTemplate>
      <LoginSection />
    </AuthTemplate>
  );
};

export default LoginPage;
