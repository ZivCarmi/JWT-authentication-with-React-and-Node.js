import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "/register";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegisterError("");

    const { name, value } = e.target;

    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateAndSubmit = (e) => {
    if (registerData.username === "" || registerData.password === "")
      return alert("Username and password are required");

    attemptRegister();
  };

  const attemptRegister = async () => {
    axios
      .post(REGISTER_URL, registerData)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setRegisterError("No Server Response");
        } else if (err.response?.status === 409) {
          setRegisterError("Username Taken");
        } else if (err.response?.status === 400) {
          setRegisterError("Username and password are required");
        } else {
          setRegisterError("Registration Failed");
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="register-form">
        <label className="username">
          <div className="label">Username</div>
          <input
            type="text"
            className="input-text"
            name="username"
            onChange={handleRegisterChange}
          />
        </label>
        <div className="password">
          <div className="label">Password</div>
          <input
            type="password"
            className="input-text"
            name="password"
            onChange={handleRegisterChange}
          />
        </div>
        <button type="button" onClick={validateAndSubmit}>
          Submit
        </button>
        {registerError}
      </form>
    </div>
  );
}

export default Register;
