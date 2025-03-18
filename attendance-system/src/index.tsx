import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; 
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routes/AppRouter"; // ✅ `App.tsx` の代わりに `AppRouter.tsx` を使う

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppRouter /> {/* ✅ ここで `AppRouter.tsx` を適用 */}
  </React.StrictMode>
);

reportWebVitals();
