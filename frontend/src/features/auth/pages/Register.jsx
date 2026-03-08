import React from "react";
import "../styles/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Loader from "../../shared/components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading, user } = useAuth();

  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
    navigate("/");
  };
  return (
    <div className="insta-wrapper">
      <div className="insta-card">
        <h1 className="logo">Web Login</h1>

        <p className="subtitle">
          Sign up to see photos and videos from your friends.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className="insta-switch">
        <p>
          <Link to={"/login"}>
            Have an account? <span>Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
