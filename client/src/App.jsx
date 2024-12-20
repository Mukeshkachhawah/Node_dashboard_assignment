import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignUP/LoginSignup";
import ForgetPassword from "./components/Forget-Password/ForgetPassword";
import ResetPassword from "./components/Reset-Password/ResetPassword";
import HomePage from "./pages/HomePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/taskboard" element={<HomePage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
