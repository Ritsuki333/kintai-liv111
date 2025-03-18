import React from "react";
import styled from "styled-components";

type InputProps = {
  type: "text" | "password";
  value?: string; // 🔹オプショナルに変更
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 🔹オプショナルに変更
  placeholder?: string;
  name?: string; // 🔹react-hook-form 用に追加
  ref?: React.Ref<HTMLInputElement>; // 🔹react-hook-form 用に追加
};

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
