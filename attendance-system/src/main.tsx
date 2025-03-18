import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter"; // ✅ ルーターをインポート

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppRouter /> {/* ✅ ここでルーターを適用 */}
  </React.StrictMode>
);
