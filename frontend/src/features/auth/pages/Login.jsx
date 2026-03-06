import "../styles/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);

    console.log("User Logged in");
    navigate("/");
  };
  return (
    <div className="insta-wrapper">
      <div className="insta-card">
        <h1 className="logo">Web Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />

          <button type="submit">Log In</button>
        </form>

        <div className="divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <p className="forgot">Forgot password?</p>
      </div>

      <div className="insta-switch">
        <p>
          <Link to={"/register"}>
            Don't have an account? <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
