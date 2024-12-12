const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "kdfhogdfsgndfljgsdfbndfbjdfs";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!(name && email && password)) {
      return res.status(404).json({ message: "All fields are required" });
    }
    const userEmail = await UserModel.findOne({ email });
    if (userEmail)
      return res.status(400).json({ message: "Email already exist" });

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

    res.status(200).json(user);
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
      return res.status(400).json({ message: "email not found" });
    }

    const databasePassword = userEmail.password;

    const match = await bcrypt.compare(password, databasePassword);

    if (!match) {
      return res.status(500).json({ message: "invalide password" });
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
module.exports = { register, login };
