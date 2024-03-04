// import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Invite from "./pages/Invite";
import Events from "./pages/Events";
import Event from "./pages/Event";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function signIn() {
    setIsLoggedIn(true);
  }

  function signOut() {
    setIsLoggedIn(false);
  }

  const authObject = {
    isLoggedIn,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authObject}>
    <div className="container text-center">
      <div id="sidebar">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/invite"} className="nav-link">
              Invite
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/events"} className="nav-link">
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={
        <RequireAuth>
          <Invite />
          </RequireAuth>}/>
        <Route path="/events" element={<Events />}>
          <Route path=":id" element={<Event />} />
        </Route>
        <Route path="/events/:id/confirm" element={<Confirmation />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
    </AuthContext.Provider>
  );
}
