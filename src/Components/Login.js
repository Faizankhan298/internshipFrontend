import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        setError("Error occured,please try later");
      });
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Login </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit">Login</button>
            <div>
              <p>Already have an account?</p>
              <button onClick={() => navigate("/signup")}>SignUp</button>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
