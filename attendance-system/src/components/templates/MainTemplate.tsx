import React from "react";

const MainTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <h1>勤怠管理システム</h1>
      {children}
    </div>
  );
};

export default MainTemplate;
