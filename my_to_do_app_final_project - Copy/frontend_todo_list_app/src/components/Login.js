import { useState } from "react";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // first-time token OR real password
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await loginUser({ email, password });
      if (data.message === "First login, please set new password") {
        // pass email to set-password page
        navigate("/set-password", { state: { email } });
      } else if (data.token) {
        localStorage.setItem("token", data.token);
        setAuthed(true);
        navigate("/app");
      } else {
        setMsg("Unexpected response");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password or first-time token" value={password} required onChange={(e)=>setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
      <p><Link to="/forgot">Forgot password?</Link></p>
      <p>New here? <Link to="/signup">Create an account</Link></p>
    </div>
  );
}
