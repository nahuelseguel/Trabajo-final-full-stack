import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // Estado para guardar lo que el usuario escribe en el campo email
  const [email, setEmail] = useState("");

  // Estado para mostrar el mensaje cuando el enlace se haya enviado
  const [mensaje, setMensaje] = useState("");

  // Función que se ejecuta cuando se hace envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // evita que el formulario recargue la página

    // Mensaje que se muestra cuando el se hace clic en "Enviar enlace"
    setMensaje("Enlace enviado");
  };

  return (
    <div className="app-root">
      <div className="app-inner">

        {/* Header */}
        <header className="login-header">
          <div className="logo-circle">
            <img
              src="./src/assets/repeat.svg"
              alt="Logo Turn Market"
              className="logo-icon"
            />
          </div>
          <h1 className="site-title">Recuperar contraseña</h1>
        </header>

        {/* Card */}
        <main className="login-card">
          <p className="role-label" style={{ marginBottom: "16px" }}>
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* Campo email */}
            <label className="field-label">Correo electrónico</label>
            <div className="input-wrap">
              <img
                src="./src/assets/envelope.svg"
                alt="email"
                className="input-icon"
              />
              <input
                className="input-field"
                type="email"
                placeholder="nombre@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email
              />
            </div>

            {/* Botón enviar */}
            <button type="submit" className="primary-btn">
              <img
                src="./src/assets/link.svg"
                alt="enviar"
                className="btn-left-icon"
              />
              Enviar enlace
            </button>

            {/* Mensaje mostrado cuando se hace click en enviar */}
            {/* RENDERIZADO CONDICIONAL, el componente se renderiza si la condición de la izquierda en true. Con lo cual && significa que si mensaje no está vacío, entonces se lo muestra.*/}
            
            {mensaje && ( 
              <p style={{ marginTop: "12px", color: "green" }}>{mensaje}</p>
            )}

            <div className="form-footer">
              <Link to="/" className="muted-link">Volver al inicio</Link>
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="login-footer">
          Copyright Turn Market
        </footer>
      </div>
    </div>
  );
};

export default ForgotPassword;