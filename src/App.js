import React from "react";
import Board from "./components/board/Board.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" exact Component={Board} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
