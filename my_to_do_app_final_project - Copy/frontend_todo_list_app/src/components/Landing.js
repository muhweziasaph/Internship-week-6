import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
      <h1>Welcome to To-Do</h1>
      <p>Please choose an option:</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link to="/signup"><button>Signup</button></Link>
        <Link to="/login"><button>Login</button></Link>
      </div>
    </div>
  );
}
