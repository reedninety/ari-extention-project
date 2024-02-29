import React from 'react';
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
    <div className="fs-3 mb-4">Login</div>
    <div className="fs-4">Welcome Back!</div>


    <form className="mt-3">
        <div className="row mb-3">
          <div>
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
            //   value={event.eventname}
            //   onChange={handleEventInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="text"
              name="location"
            //   value={event.location}
            //   onChange={handleEventInputChange}
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
