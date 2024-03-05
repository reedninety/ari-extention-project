import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { isLoggedIn, signIn } = useAuth();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    user_firstname: "",
    user_surname: ""
});

async function registerUser () {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Failed to add event");
    }
    const data = await response.json();
    //actually, i want them to be directed to the log in page
    signIn();
  } catch (err) {
    console.log(err);
  }
}

function handleChange(event){
  const{ value, name } = event.target;
  setNewUser((state) => ({
      ...state,
      [name]: value
  }))
}
  return (
    <div>
        <div className="fs-3">Register</div>

        <form className="mt-3" onSubmit={registerUser}>
        <div className="row mb-3">
          <div>
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}             
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              type="text"
              name="user_firstname"
              value={newUser.user_firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Surname</label>
            <input
              className="form-control"
              type="text"
              name="user_surname"
              value={newUser.user_surname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-outline-secondary">
          Register Now
        </button>
      </form>
    </div>
  )
}
