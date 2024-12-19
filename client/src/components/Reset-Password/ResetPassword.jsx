import { useState } from "react";
import { Button, Snackbar, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api"; // Import your axios API setup

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/reset-password", { token, newPassword });
      setSnackbarMessage(
        "Password reset successfully! Redirecting to login..."
      );
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Error resetting password. Try again."
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <div className="form-container reset-password">
        <form>
          <h1>Reset Password</h1>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
