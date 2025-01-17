import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    axios.post("https://internshipbackend-pgyg.onrender.com/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch(() => {
        setError("Internal error occured, please try again.");
      });
  }

  return (
    <>
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h2>SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
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
            <button type="submit">SignUp</button>
            <div>
              <p>Already have an account?</p>
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
