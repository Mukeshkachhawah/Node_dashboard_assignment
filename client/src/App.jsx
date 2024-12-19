import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignUP/LoginSignup";
import ForgetPassword from "./components/Forget-Password/ForgetPassword";
import ResetPassword from "./components/Reset-Password/ResetPassword";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/taskboard" element={<Home />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
