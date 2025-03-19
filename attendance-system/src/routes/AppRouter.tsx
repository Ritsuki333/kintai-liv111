import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage";
import UserTopPage from "../components/pages/UserTopPage"; 
import DashboardPage from "../components/pages/DashboardPage"; // ✅ 追加

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<UserTopPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ 修正 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
