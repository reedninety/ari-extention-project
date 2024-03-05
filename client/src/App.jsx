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
import NavBar from "./components/NavBar.jsx";
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
      <div>
    <div className="container text-center">
      <NavBar />
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={
        <RequireAuth>
          <Invite />
          </RequireAuth>}/>
        <Route path="/events" element={
        <RequireAuth><Events /></RequireAuth>}/>
          <Route path="/events/:id" element={<RequireAuth><Event /></RequireAuth>} />
        <Route path="/events/:id/confirm" element={<RequireAuth><Confirmation /></RequireAuth>} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      
    </div>
    </div>
    </AuthContext.Provider>
  );
}
