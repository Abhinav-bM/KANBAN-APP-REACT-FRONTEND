import React, { useState } from "react";
import "./Login.css";
import axios from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", userDetails)
      .then((response) => {
        if (response.status === 200) {
          console.log("resonse from login : ", response);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center my-40">
      <div className="bg-gray-200 py-10 px-4 rounded-md shadow-xl">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <h3 className="font-mono text-xl">Login</h3>
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="w-72 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 my-1"
              placeholder="Enter your email..."
            />

            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-72 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 my-1"
              placeholder="Enter your password"
            />

            <small  className="p-2 text-center"><Link to="/signup">
              New user ?
            </Link></small>

            <button className="w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md my-1">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
