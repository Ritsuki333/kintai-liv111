import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("名前は必須です"),
  email: yup.string().email("無効なメールアドレス").required("メールアドレスは必須です"),
  password: yup.string().min(6, "パスワードは6文字以上必要です").required("パスワードは必須です"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("登録成功！ログインしてください");
      navigate("/login"); // 登録後にログインページへ移動
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "登録に失敗しました");
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="名前" {...register("name")} />
        <p style={{ color: "red" }}>{errors.name?.message}</p>

        <input type="email" placeholder="メールアドレス" {...register("email")} />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <input type="password" placeholder="パスワード" {...register("password")} />
        <p style={{ color: "red" }}>{errors.password?.message}</p>

        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default RegisterPage;
