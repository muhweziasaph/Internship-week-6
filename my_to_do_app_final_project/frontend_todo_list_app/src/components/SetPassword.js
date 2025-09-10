import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { setPassword } from "../api";

export default function SetPassword() {
  const { state } = useLocation();
  const emailFromState = state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await setPassword({ email, newPassword, confirmPassword });
      setMsg(data.message || "Password set");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Set New Password</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="New Password" value={newPassword} required onChange={(e)=>setNewPassword(e.target.value)} /><br/>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} required onChange={(e)=>setConfirmPassword(e.target.value)} /><br/>
        <button type="submit">Save</button>
      </form>
      {msg && <p>{msg}</p>}
      <p><Link to="/login">Back to Login</Link></p>
    </div>
  );
}
