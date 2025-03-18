import React from "react";
import LoginForm from "../molecules/LoginForm";

const LoginSection: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("ログイン処理: ", email, password);
  };

  return (
    <div>
      <h2>ログインページ</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginSection;
