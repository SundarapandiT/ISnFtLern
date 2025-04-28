import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, {useEffect} from "react";
import RegisterPage from "./views/pages/RegisterPage";
import EmailVerification from "./views/pages/EmailVerification";
import { Toaster } from "react-hot-toast";
import LoginPage from "./views/pages/LoginPage";
import ForgotPassword from "./views/pages/ForgetPage";
import ScheduleShipment from "./views/pages/scheduleshipment/Scheduleshipment";
import ResetPassword from "./views/pages/ResetPassword";
import "./App.css";
import "./index.css";


// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const authToken = sessionStorage.getItem("user"); 
 
  return authToken ? children : <Navigate to="/auth/login-page" replace />;
};

function App() {

  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
  //       (e.ctrlKey && e.key === "U")
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       return false;
  //     }
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <Router>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth/login-page" />} />
        <Route path="/auth/login-page" element={<LoginPage />} />
        <Route path="/auth/register-page" element={<RegisterPage />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/auth/forgotpassword-page" element={<ForgotPassword />} />
        <Route path="/auth/ResetPassword" element={<ResetPassword />} />
    

        {/*  Protected route (only accessible if user exists) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <ScheduleShipment />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login-page" replace />} />

      </Routes>
    </Router>
  );
}

export default App;