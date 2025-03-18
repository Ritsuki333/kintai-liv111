import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { loginSchema } from "../../utils/validation";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import styled from "styled-components";

type LoginFormInputs = {
  email: string;
  password: string;
};

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null);
    try {
      const response = await login(data.email, data.password);
      localStorage.setItem("token", response.token); // 🔹トークンを保存
      navigate("/dashboard"); // 🔹ログイン成功時にダッシュボードへ移動
    } catch (error) {
      setErrorMessage("メールアドレスまたはパスワードが正しくありません");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label text="メールアドレス" />
      <Input type="text" placeholder="user@example.com" {...register("email")} />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <Label text="パスワード" />
      <Input type="password" {...register("password")} />
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Button text="ログイン" onClick={handleSubmit(onSubmit)} disabled={!isValid} />
    </form>
  );
};

export default LoginForm;
