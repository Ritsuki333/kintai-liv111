import React from "react";
import { useNavigate } from "react-router-dom";
import AuthTemplate from "../../components/templates/AuthTemplate";
import LoginSection from "../../components/organisms/LoginSection";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // ✅ `/top` → `/dashboard` に修正
    }
  }, [navigate]);

  return (
    <AuthTemplate>
      <LoginSection />
    </AuthTemplate>
  );
};

export default LoginPage;
