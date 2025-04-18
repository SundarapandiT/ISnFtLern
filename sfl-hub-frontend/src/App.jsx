import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import RegisterPage from "./views/pages/RegisterPage";
import EmailVerification from "./views/pages/EmailVerification";
import { Toaster } from "react-hot-toast";
import LoginPage from "./views/pages/LoginPage";
import ForgotPassword from "./views/pages/ForgetPage";
import ScheduleShipment from "./views/pages/scheduleshipment/Scheduleshipment";
import ResetPassword from "./views/pages/ResetPassword";
// import Cookies from "js-cookie";
import "./App.css";
import "./index.css";
// import ScheduleConfirmation from "./views/pages/scheduleconfirmation/ScheduleConfirmation";

// ProtectedRoute component
// const ProtectedRoute = ({ children }) => {
//   const authToken = sessionStorage.getItem("user"); 
 
//   return authToken ? children : <Navigate to="/auth/login-page" replace />;
// };

function App() {
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
        {/* <Route path="/scheduleconfirmation" element={<ScheduleConfirmation />} /> */}

        {/*  Protected route (only accessible if user exists) */}
        <Route
          path="/admin/*"
          element={
            // <ProtectedRoute>
              <ScheduleShipment />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
