export default function Header({ onLogout }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
      <h2>My To-Do</h2>
      {onLogout && <button onClick={onLogout}>Logout</button>}
    </div>
  );
}
