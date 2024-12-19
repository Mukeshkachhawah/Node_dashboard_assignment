import { useState } from "react";
import { Button, Snackbar, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import API from "../../api";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      navigate("/taskboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.message === "Incorrect password") {
            setSnackbarMessage("Incorrect password. Please try again.");
          } else {
            setSnackbarMessage("User not found. Please check your email.");
          }
        } else {
          setSnackbarMessage("An error occurred. Please try again.");
        }
        setOpenSnackbar(true);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });
      alert("Sign Up Successful! You can now login.");
      setIsSignUp(false);
      navigate("/taskboard");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        setSnackbarMessage("An account with this email already exists.");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Error signing up. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for login</span>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/forget-password"}>Forgot your password?</Link>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <Button className="hidden" onClick={handleToggle}>
              Sign In
            </Button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome, Friend!</h1>
            <p>Enter your personal details to use all of site features</p>
            <Button className="hidden" onClick={handleToggle}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
