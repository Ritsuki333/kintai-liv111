import React from "react";

type AuthTemplateProps = {
  children: React.ReactNode;
};

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthTemplate;
