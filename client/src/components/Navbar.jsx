import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/img/logo.svg";
import "./Navbar.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <Link to="/" style={{ display: "flex", gap: "10px" }}>
        <img src={logo} alt="" id="logo" />
        <h1>Mewsic</h1>
      </Link>
      <nav>
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{user.email}</span>
            <div className="btn" onClick={handleClick}>
              Log out
            </div>
          </div>
        )}
        {!user && (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login">
              <div className="btn b">Login</div>
            </Link>
            <Link to="/signup">
              <div className="btn">Sign up</div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
