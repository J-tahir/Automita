import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.jpeg";
import { data } from "../data";
import Loading from "../components/Loading";
import "./Login.css";

const Login = () => {
  const [auth, setAuth] = useState("Authentication Required");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(data);
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email == "" || password == "") {
      setTimeout(() => {
        setLoading(false);
        setAuth("Empty Input Fields");
      }, 300);
      return;
    }
    if (email != user.email || password != user.password) {
      setAuth("Verifying...");
      setTimeout(() => {
        setLoading(false);
        setAuth("Authentication Failed");
      }, 1000);
      resetFields();
      return;
    }
    if (email == user.email && password == user.password) {
      setAuth("Verifying...");
      setTimeout(() => {
        setLoading(false);
        setAuth("Login Successful");
      }, 1000);
      resetFields();
      return;
    }
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="container">
        <form className="form">
          <img src={logo} className="logo" />
          <p className="alert">{auth}</p>
          {isLoading && <Loading />}
          <div className="form-row">
            <label htmlFor="email">Login</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email Address"
              ref={emailInputRef}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <span className="form-entry">
            <button type="submit" onClick={handleClick}>
              Login
            </button>
            <a href="#">Forgot Password?</a>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
