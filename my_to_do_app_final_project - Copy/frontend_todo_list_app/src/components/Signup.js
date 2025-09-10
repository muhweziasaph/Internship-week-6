import { useState } from "react";
import { registerUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await registerUser({ email, phone });
      setMsg(data.message || "Registered. Check email for token.");
      // optional: go to login after a short delay
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} /><br/>
        <input type="text" placeholder="Phone" value={phone} required onChange={(e)=>setPhone(e.target.value)} /><br/>
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
