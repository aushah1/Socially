import "../styles/form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Loader from "../../shared/components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  let isLoading = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);

    // if (loading) return <Loader />;
    isLoading = loading;
    navigate("/");
  };

  return (
    <div className="auth-root">
      <div className="auth-bg">
        <div className="auth-blob blob-1" />
        <div className="auth-blob blob-2" />
        <div className="auth-blob blob-3" />
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="brand">
            <div className="brand-icon">
              <img src="/logo.png" alt="logo" />
            </div>
            <h1 className="brand-name">Socially</h1>
          </div>

          <p className="auth-tagline">
            Join the conversation. Start connecting.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field-group">
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 5l8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 10a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 20 20" fill="none">
                    <rect
                      x="3"
                      y="8"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 8V6a3 3 0 016 0v2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy="13" r="1.25" fill="currentColor" />
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <p className="terms-note">
              By signing up, you agree to our{" "}
              <span className="terms-link">Terms of Service</span> and{" "}
              <span className="terms-link">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              className="auth-btn primary"
              disabled={isLoading}>
              {isLoading ? (
                <span className="btn-spinner" />
              ) : (
                <>
                  <span>Create Account</span>
                  <svg viewBox="0 0 20 20" fill="none" className="btn-arrow">
                    <path
                      d="M4 10h12M11 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="auth-footer-card">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Sign in <span className="link-arrow">→</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
