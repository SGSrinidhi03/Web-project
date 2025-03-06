
import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({setQuery}) => { 
  const { user, logout } = useAuth();

 

  return ( 
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">NoteBuddy</Link>
      </div>
      <input type="text" placeholder="Search notes..." className="search-bar" onChange={(e) => setQuery(e.target.value)}/>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Signup</Link>
          </>
        ) : (
          <>
            <span className="username">Hey {user.name}!</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 