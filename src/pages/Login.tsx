/** @format */

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import "./Login.css";
import ApiLogin from "../api-calls/auth/login";
import { auth } from "../utils/firebase";
import useAuthStore from "../contexts/auth/AuthStore";
import handleError from "../utils/error/error-handler";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const { addUser } = useAuthStore.getState();

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await user.user.getIdToken(true);
      setToken(userToken);
      addUser({
        email,
        password,
        token: token || userToken,
        username: username,
      });
      await ApiLogin(userToken, "login");
      toast.success("Logged in successfully", { autoClose: 1000 });
      navigate("/");
      window.location.reload();
    } catch (err) {
      const errorMsg = handleError(err);
      toast.error(errorMsg, { autoClose: 1000 });
    }
  };

  const signup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToken = await newUser.user.getIdToken();
      setToken(userToken);
      addUser({ username, email, password, token: token || userToken });
      await ApiLogin(userToken, "signup");
      toast.success("Signed up successfully", { autoClose: 1000 });
      navigate("/");
      window.location.reload();
    } catch (err) {
      const errorMsg = handleError(err);
      toast.error(errorMsg, { autoClose: 1000 });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form>
          {!isLogin ? (
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                id="exampleInputUsername1"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="exampleInputUsername1" className="form-label">
                Username
              </label>
            </div>
          ) : null}
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              id="exampleInputEmail1"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="submit-button"
              onClick={isLogin ? login : signup}
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <div className="signup-link">
            Do {!isLogin ? "you" : "not"} have an account?
            <button
              className="signup-button"
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {!isLogin ? "Login" : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
