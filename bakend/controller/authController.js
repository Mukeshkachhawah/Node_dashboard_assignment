const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "kdfhogdfsgndfljgsdfbndfbjdfs";
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!(name && email && password)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userEmail = await UserModel.findOne({ email });
    if (userEmail)
      return res.status(409).json({ message: "Email already exist" });

    const salt = bcrypt.genSaltSync(10);
    console.log("Generated salt:", salt);

    const hash = bcrypt.hashSync(password, salt);
    console.log("Hashed password:", hash);

    const data = {
      name,
      email,
      password: hash,
    };

    const user = new UserModel(data);
    await user.save();
    console.log("User successfully saved:", user);

    res.status(201).json(user);
  } catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).json({
      message: "Internal server error while creating user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await UserModel.findOne({ email });
    console.log("----------------->>>>>> :", userEmail);

    if (!userEmail) {
      return res.status(401).json({ message: "email not found" });
    }

    const databasePassword = userEmail.password;

    const match = await bcrypt.compare(password, databasePassword);

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: userEmail._id }, secretKey, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, _id: userEmail._id, message: "user Login successful" });
  } catch (error) {
    res.status(500).json({ message: " error in login user" });
  }
};

const passwordForget = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email received for password reset:", email);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mukeshkachhawah1947@gmail.com",
        pass: "dbow thvf yxhf bezd",
      },
    });

    const mailOptions = {
      from: email,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending reset email" });
      }
      return res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.log("Error in forgetPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded JWT Token:", decoded);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the token after resetting password
    user.resetPasswordExpires = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { register, login, passwordForget, resetPassword };
