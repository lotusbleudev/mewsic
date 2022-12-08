import { React, useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex-column"
      style={{ backgroundColor: "#0d1117", width: "700px", margin: "auto" }}
    >
      <h3>Login</h3>
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
      <div className="btn b" disabled={isLoading} onClick={handleSubmit}>
        Login
      </div>
      <button type="submit" style={{ display: "none" }}></button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

export default Login;
