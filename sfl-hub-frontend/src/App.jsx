import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import {React,useState} from "react";
import RegisterPage from "./views/pages/RegisterPage";
import EmailVerification from "./views/pages/EmailVerification";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {
  return (
    <Router>
      <div><Toaster position="top-right" reverseOrder={false} /></div>
      <Routes>
      <Route path="/" element={<Navigate replace to="/auth/register-page" />} />
        <Route path="/auth/register-page" element={<RegisterPage />} />
        <Route path="/emailverification" element={<EmailVerification/>}/>
      </Routes>
    </Router>
  );
}

export default App;
