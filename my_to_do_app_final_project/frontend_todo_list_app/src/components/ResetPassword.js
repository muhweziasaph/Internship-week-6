import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../api";

export default function ResetPassword() {
  const { state } = useLocation();
  const emailFromState = state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await resetPassword({ email, token, newPassword, confirmPassword });
      setMsg(data.message || "Password reset");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} /><br/>
        <input type="text" placeholder="Reset token" value={token} required onChange={(e)=>setToken(e.target.value)} /><br/>
        <input type="password" placeholder="New Password" value={newPassword} required onChange={(e)=>setNewPassword(e.target.value)} /><br/>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} required onChange={(e)=>setConfirmPassword(e.target.value)} /><br/>
        <button type="submit">Reset</button>
      </form>
      {msg && <p>{msg}</p>}
      <p><Link to="/login">Back to Login</Link></p>
    </div>
  );
}
