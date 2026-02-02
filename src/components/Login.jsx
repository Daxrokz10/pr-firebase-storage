import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully! Logging in...");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/view-books");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/view-books");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="login-card">
              <h2 className="text-center mb-4">
                {isSignUp ? "Sign Up" : "Login"}
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleEmailAuth}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email :
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary fw-bold w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
                </button>
              </form>

              <div className="or-divider my-3">
                <span>OR</span>
              </div>

              <button
                type="button"
                className="btn btn-outline-danger fw-bold w-100 mb-3"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in with Google"}
              </button>

              <p className="text-center mt-3">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
