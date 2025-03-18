import React from "react";
import styled from "styled-components";

type InputProps = {
  type: "text" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder }) => {
  return <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder} />;
};

export default Input;
