import { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
    })
    response = await response.json();

    if(response.message === "login success") {
      navigate("/home");
    }
    else {
      alert('Error');
    }
  }

  return (
    <>
      <header className="header" style={{ textAlign: "center" }}>
        <h1 className="company-title">Poncho Corp</h1>
      </header>
      <h2 className="title">Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <div className="login-row">
          <label htmlFor="username-input">Username:</label>
          <input id="username-input" type="text" placeholder="username" required onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="login-row">
          <label htmlFor="password-input">Password:</label>
          <input id="password-input" type="password" required onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className="login-btn">Login</button>
      </form>

      <div className="extra-links" style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "0.9em" }}>
        <p style={{ cursor: "pointer", color: "#555", marginLeft: "10px" }}><Link to="/register">Crear nuevo usuario</Link></p>
        <p style={{ cursor: "pointer", color: "#555", marginRight: "10px" }}><Link to="/password">Recuperar contraseña</Link></p>
      </div>
    </>
  );
}

export default App;