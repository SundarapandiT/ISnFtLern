import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import {React} from "react";
import RegisterPage from "./views/pages/RegisterPage";
import EmailVerification from "./views/pages/EmailVerification";
import { Toaster } from "react-hot-toast";
import "./index.css";
import LoginPage from "./views/pages/LoginPage";
import ForgotPassword from "./views/pages/ForgetPage";
import ScheduleShipment from "./views/pages/scheduleshipment/Scheduleshipment";
import Myshipment from "./views/pages/myshipment/Myshipment";



function App() {

  return (
    <Router>
      <div><Toaster position="top-right" reverseOrder={false} /></div>
      <Routes>
      <Route path="/" element={<Navigate replace to="/auth/login-page" />} />
        <Route path="/auth/login-page" element={<LoginPage />} />
        <Route path="/auth/register-page" element={<RegisterPage />} />
        <Route path="/emailverification" element={<EmailVerification/>}/>
        <Route path="/auth/forgotpassword-page" element={<ForgotPassword/>}/>
        <Route path="/admin/Scheduleshipment" element={<ScheduleShipment/>}/>
        <Route path="/admin/Myshipment" element={<Myshipment/>}/>
      </Routes>
    </Router>
  );
}

export default App;
