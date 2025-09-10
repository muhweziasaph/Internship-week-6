import { useState } from "react";
import { forgotPassword } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await forgotPassword({ email });
      setMsg(data.message || "Token sent");
      navigate("/reset", { state: { email } });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} /><br/>
        <button type="submit">Send Reset Token</button>
      </form>
      {msg && <p>{msg}</p>}
      <p><Link to="/login">Back to Login</Link></p>
    </div>
  );
}
