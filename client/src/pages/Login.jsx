import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios, {isCancel, AxiosError} from 'axios';

export default function Login() {
  const [input, setInput] = useState({
    username: "",
    password: ""
});
  

  function handleChange(event){
    const{ value, name } = event.target;
    setInput((state) => ({
        ...state,
        [name]: value
    }))
  }

    const login = async () => {
        try {
          const { data } = await axios("/api/users/login", {
            method: "POST",
            data: credentials,
          });
      
          //store it locally
          localStorage.setItem("token", data.token);
          console.log(data.message, data.token);
        } catch (error) {
          console.log(error);
        }
      };

    function handleSubmit(event){
        event.preventDefault();
        login();
    }
  
    return (
    <div>
    <div className="fs-3 mb-4">Login</div>
    <div className="fs-4">Welcome Back!</div>


    <form className="mt-3" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div>
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-outline-secondary">
          Login
        </button>
      </form>
    </div>
  )
}
