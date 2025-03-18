import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validation";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import styled from "styled-components";

type LoginFormProps = {
  onLogin: (email: string, password: string) => void;
};

type LoginFormInputs = {
  email: string;
  password: string;
};

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`;

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormInputs) => {
    onLogin(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label text="メールアドレス" />
      <Input type="text" placeholder="user@example.com" {...register("email")} />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <Label text="パスワード" />
      <Input type="password" {...register("password")} />
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

      <Button text="ログイン" onClick={handleSubmit(onSubmit)} disabled={!isValid} />
    </form>
  );
};

export default LoginForm;
