import React from "react";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#f4a261")};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  border-radius: 5px;
`;

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default Button;
