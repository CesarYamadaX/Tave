import { useState } from "react";

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!email.includes("@")) {
      setError("Ingrese un correo electrónico válido");
      return;
    }
    
    setMessage("Si el correo está registrado, recibirá un enlace para restablecer su contraseña.");
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block">Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ingrese su correo"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-3">Enviar</button>
      </form>
      {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
    </div>
  );
}