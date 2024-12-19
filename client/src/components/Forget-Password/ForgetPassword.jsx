import { useState } from "react";
import { Button, Snackbar, TextField } from "@mui/material";
import API from "../../api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/forget-password", { email });

      setSnackbarMessage("Password reset link sent! Please check your email.");
      setOpenSnackbar(true);
    } catch (error) {
      if (error.response) {
        setSnackbarMessage(
          error.response.data.message ||
            "Error sending reset link. Please try again."
        );
      } else {
        setSnackbarMessage("Network error. Please try again.");
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="container">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <div className="form-container forget-password">
        <form>
          <h1>Reset Password</h1>
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
          <span>Enter your email to receive a password reset link</span>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePasswordReset}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
