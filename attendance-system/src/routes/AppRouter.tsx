import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import DashboardPage from "../components/pages/DashboardPage"; // ✅ 追加
import UserTopPage from "../components/pages/UserTopPage";
import AttendancePage from "../components/pages/AttendancePage";
import AttendanceInfoPage from "../components/pages/AttendanceInfoPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ 追加 */}
        <Route path="/top" element={<UserTopPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/attendance-info" element={<AttendanceInfoPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
