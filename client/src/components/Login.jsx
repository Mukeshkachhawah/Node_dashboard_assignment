import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      navigate("/taskboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <input
          placeholder="email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
