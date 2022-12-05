import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <Link to="/">
        <h1>Mewsic</h1>
      </Link>
    </header>
  );
}

export default Navbar;
