import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppNavbar from "./assets/components/AppNavbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((result) => {
        if (result.data === "Duplicate Email") {
          setErrorMessage(
            "This email ID already has an account. Redirecting to Login Page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data === "Duplicate Email") {
          setErrorMessage(
            "This email ID already has an account. Redirecting to Login Page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <>
      <AppNavbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Sign Up</h2>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Enter your username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Sign Up
                    </button>
                    <Link
                      to="/login"
                      className="btn btn-secondary btn-block mt-4"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
