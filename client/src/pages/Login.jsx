import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import Events from "./Events";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const {isLoggedIn, signIn } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: ""
});
const [data, setData] = useState(null);

const { username, password } = input;

  function handleChange(event){
    const{ value, name } = event.target;
    setInput((state) => ({
        ...state,
        [name]: value
    }))
  }

    const login = async () => {
        try {
          const { data } = await axios.post("/api/users/login", input);
      
          //store the token locally- put it in pocket
          localStorage.setItem("token", data.token);
          console.log(data.message, data.token);
        signIn();
        } catch (error) {
          console.log(error);
        }
      };

    //logout = delete the token from the front end

  const logout = () => {
    localStorage.removeItem("token");
  };

  //request data from api/profile. need to send the token in the headers of your request

  const requestData = async () => {
    try {
      const { data } = await axios("/api/users", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setData(data.message);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  //handleSubmit - currently exists so I can check that it was working 
    function handleSubmit(event){
        event.preventDefault();
        login();
        requestData();
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

        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-secondary" onClick={login}>
            Log in
          </button>
        </div>
      </form>
      <Routes>
      <Route path="/events" element={<Events />}></Route>
      </Routes>
    </div>
  )
}
