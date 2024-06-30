import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Validations from "./Validations";
import axios from "axios";
import { Appcontext } from "../../../App";

const Login = () => {

  const { userAccess, setUserAccess } = useContext(Appcontext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEvent = async (e) => {
    e.preventDefault();
    let dataset = {
      userName: values.email,
      password: values.password,
    };
    await axios.post("http://localhost:8081/authenticateUser", dataset).then((response) => {
      if (response.status === 200 && response.data.message === "Authentication successful.") {
        setUserAccess({
          admin: response.data.user.adminAccess,
          quotation: response.data.user.quatationAccess,
          edit: response.data.user.quatationedtaccess,
        })
        navigate("/sidenav");
        localStorage.setItem('auth', true)
      }
    });
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h1 className="align-text-center">
          {" "}
          <strong>Login Form</strong>
        </h1>
        <form onSubmit={handleEvent}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
