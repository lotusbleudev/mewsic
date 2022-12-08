import { React, useState } from "react";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex-column"
      style={{ backgroundColor: "#0d1117", width: "700px", margin: "auto" }}
    >
      <h3>Sign up</h3>
      <div>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
        />
      </div>
      <div style={{ marginLeft: "-27px" }}>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input"
        />
      </div>
      <div disabled={isLoading} className="btn b" onClick={handleSubmit}>
        Sign up
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

export default Signup;
