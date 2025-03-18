import React from "react";
import AuthTemplate from "../templates/AuthTemplate";
import LoginSection from "../organisms/LoginSection";

const LoginPage: React.FC = () => {
  return (
    <AuthTemplate>
      <LoginSection />
    </AuthTemplate>
  );
};

export default LoginPage;
