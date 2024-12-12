const jwt = require("jsonwebtoken");
const secretKey = "sadfbiuadsgmadfbldfabvmsfnugdfsnjfdjb";
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(`>>>>>>>>>token>>>>>>>`, token);

    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    const splitToken = token.split(" ")[1];
    console.log(`<<<<<<<<<<splite token : `, splitToken);

    const decoded = jwt.verify(splitToken, secretKey);
    console.log(`decoded token`, decoded);

    if (!decoded) {
      return res.status(401).send("Access denied. Invalid token.");
    }
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(404).send("User not found.");

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
