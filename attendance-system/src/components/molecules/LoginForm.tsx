import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

type LoginFormProps = {
  onLogin: (email: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Label text="メールアドレス" />
      <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
      <Label text="パスワード" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="ログイン" onClick={() => onLogin(email, password)} disabled={!email || password.length < 8} />
    </div>
  );
};

export default LoginForm;
