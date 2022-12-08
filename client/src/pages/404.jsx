import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex-column" style={{ gap: "50px" }}>
      <h1 style={{ marginTop: "20px" }}>Sorry !</h1>
      <h2>Error 404 : This page doesnt exit... yet?</h2>
      <Link to="/">
        <div className="btn">Return to home safely</div>
      </Link>
    </div>
  );
}

export default NotFound;
