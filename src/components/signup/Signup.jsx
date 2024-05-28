import axios from "../../axiosConfig";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    axios.post("/signup", userDetails).then((response) => {
      console.log("response : ", response);
      if (response.status === 200) {
        navigate("/");
      }
    });
  };

  return (
    <div className="flex justify-center items-center my-40">
      <div className="bg-gray-200 py-10 px-4 rounded-md shadow-xl">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <h3 className="font-mono text-xl">Signup</h3>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className="w-72 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 my-1"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name..."
            />
            <input
              type="text"
              className="w-72 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 my-1"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email..."
            />
            <input
              type="password"
              className="w-72 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 my-1"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <small className="p-2 text-center">
              <Link to="/login">Already have an account ?</Link>
            </small>

            <button className=" w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md my-1">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
