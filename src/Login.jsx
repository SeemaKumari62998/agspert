import "./App.css";
import { useAuth } from "./Context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/home");
  };

  return (
    <div className="register">
      <div div className="col-1">
        <form onSubmit={handleSubmit} className="flex">
          <div className=".label-input-group">
            <label className="label">Username:</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=".label-input-group">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
