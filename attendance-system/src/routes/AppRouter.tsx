import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage"; // ✅ パス修正
import UserTopPage from "../components/pages/UserTopPage"; // ✅ パス修正

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserTopPage />} />  {/* ✅ /dashboard に修正 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
