import { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/login";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { setAuth } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleLoginChange = (e) => {
    setLoginError("");

    const { name, value } = e.target;

    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateAndSubmit = () => {
    if (loginData.username === "" || loginData.password === "")
      return setLoginError("Username and password are required");

    attemptLogin();
  };

  const attemptLogin = async () => {
    axios
      .post(LOGIN_URL, loginData, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        const accessToken = data?.accessToken;
        setAuth({ username: loginData.username, accessToken });
        setIsLogin(true);

        // redirect the user back to his required page
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setLoginError("No Server Response");
        } else if (err.response?.status === 403) {
          setLoginError("Unauthorized");
        } else if (err.response?.status === 401) {
          setLoginError("Wrong Username or Password");
        } else {
          setLoginError("Login Failed");
        }
      });
  };

  return (
    <>
      {isLogin ? (
        <div>
          <h1>You are logged in!</h1>

          <a href="/">Go to Home</a>
        </div>
      ) : (
        <section>
          <h2>Login</h2>
          <form className="login-form">
            <label className="username">
              <div className="label">Username</div>
              <input
                type="text"
                className="input-text"
                name="username"
                onChange={handleLoginChange}
              />
            </label>
            <div className="password">
              <div className="label">Password</div>
              <input
                type="password"
                className="input-text"
                name="password"
                onChange={handleLoginChange}
              />
            </div>
            <button type="button" onClick={validateAndSubmit}>
              Submit
            </button>
            {loginError}
          </form>
        </section>
      )}
    </>
  );
}

export default Login;
