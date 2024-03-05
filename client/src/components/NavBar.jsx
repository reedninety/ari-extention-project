import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { isLoggedIn, signIn, signOut } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    signOut();
  };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navigation
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/">
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li class="nav-item">
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li class="nav-item">
                <Link class="nav-link" to="/events">
                  Events
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li class="nav-item">
                <Link class="nav-link" to="/invite">
                  Invite
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <button className="btn btn-outline-dark ml-2" onClick={logout}>
                Log out
              </button>
            )}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="">You are logged in</div>
        ) : (
          <div className="">You are logged out</div>
        )}
      </div>
    </nav>
  );
}