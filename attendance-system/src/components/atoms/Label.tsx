import React from "react";
import styled from "styled-components";

type LabelProps = {
  text: string;
};

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Label: React.FC<LabelProps> = ({ text }) => {
  return <StyledLabel>{text}</StyledLabel>;
};

export default Label;
