import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Invite from "./pages/Invite";
import Events from "./pages/Events";

export default function App() {
  return (
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
        </ul>
      </div>
      <h1>OWL MAIL</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/events" element={<Events />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
