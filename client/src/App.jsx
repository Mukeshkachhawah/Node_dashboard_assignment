import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Taskboard from "./components/TaskBoard";

const App = () => {
  return (
    <>
      <Router>
        <h1>Task Board</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/taskboard" element={<Taskboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
