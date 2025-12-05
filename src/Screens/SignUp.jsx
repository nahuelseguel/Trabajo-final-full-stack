import React, { useState } from "react";
import { Link } from "react-router-dom";
import Boton from "../components/botonRoles/Boton";

const SignUp = () => {
  // estado para los campos
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    profesion: "",
    rangoPrecio: "",
  });

  // rol: "cliente" o "profesional"
  const [role, setRole] = useState("cliente");

  // mensajes de error y registro exitoso
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // validación contraseña 8 caracteres, letras y números
  const validarPassword = (pass) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(pass);
  };

  // validación de teléfono solo dígitos y entre 6 y 15 cifras
  const validarTelefono = (tel) => {
    const regex = /^\d{10}$/;
    return regex.test(tel);
  };

  // Función que se le pasa al onChamge de los inputs para actualizar datos
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Función que se ejecuta cuando se envía el form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // comprobaciones que verifican que no queden campos vacios (.trim verifica que no haya espacios vacios antes y despues del texto)
    if (!form.nombre.trim() || !form.apellido.trim()) {
      setError("Nombre y apellido son obligatorios.");
      return;
    }

    if (!validarTelefono(form.telefono.trim())) {
      setError("El teléfono debe tener 10 dígitos.");
      return;
    }

    if (role === "profesional" && !form.profesion.trim()) {
      setError("Debes indicar tu profesión u oficio.");
      return;
    }

    if (role === "profesional" && !form.rangoPrecio) {
      setError("Seleccioná el rango de precio en el que trabajás.");
      return;
    }

    if (!form.email.trim()) {
      setError("El email es obligatorio.");
      return;
    }

    if (!validarPassword(form.password)) {
      setError("La contraseña debe tener mínimo 8 caracteres y combinar letras y números.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const payload = { ...form, role };
      const res = await fetch('http://localhost:4000/usuarios', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error servidor: ${res.status} ${text}`);
      }

      const saved = await res.json();
      console.log("Registro guardado:", saved);

      setSuccess(true);
      setError("");
      setForm({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
        confirmPassword: "",
        profesion: "",
        rangoPrecio: "",
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el registro. Revisa la conexión al servidor.");
    }

  };

  return (
    <div>
      <header className="login-header">
        <div className="logo-circle">
          <img
            src="./src/assets/repeat.svg"
            alt="Logo Turn Market"
            className="logo-icon"
          />
        </div>
        <h1 className="site-title">Crear cuenta</h1>
      </header>

      <main className="login-card">
        <section className="role-section">
          <p className="role-label">Registrarse como</p>
          <div className="role-toggle">
            <Boton
              active={role === "cliente"}
              onClick={() => setRole("cliente")}
              icono={<img src="/src/assets/person.svg" alt="Icono cliente" className="btn-icon" />}
              nombreBtn="Cliente"
            />
            <Boton
              active={role === "profesional"}
              onClick={() => setRole("profesional")}
              icono={<img src="/src/assets/briefcase.svg" alt="Icono profesional" className="btn-icon" />}
              nombreBtn="Profesional"
            />
          </div>
        </section>

        <hr className="divider" />

        <form className="login-form" onSubmit={handleSubmit}>

          {/* Nombre */}
          <label className="field-label">Nombre</label>
          <div className="input-wrap">
            <img src="/src/assets/person.svg" alt="nombre" className="input-icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Tu nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Apellido */}
          <label className="field-label">Apellido</label>
          <div className="input-wrap">
            <img src="/src/assets/person.svg" alt="apellido" className="input-icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Tu apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          {/* Teléfono */}
          <label className="field-label">Teléfono</label>
          <div className="input-wrap">
            <img src="/src/assets/telephone.svg" alt="tel" className="input-icon" />
            <input
              className="input-field"
              type="tel"
              placeholder="Ej: 542983467812"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>

          {/* Profesión u Oficio y Rango de precios (sólo en singUp progesionales) */}
          {role === "profesional" && (
            <>
              <label className="field-label">Profesión u Oficio</label>
              <div className="input-wrap">
                <img src="/src/assets/briefcase.svg" alt="profesion" className="input-icon" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Ej: Electricista, Carpintero, Fotógrafo…"
                  name="profesion"
                  value={form.profesion || ""}
                  onChange={handleChange}
                  required={role === "profesional"}
                />
              </div>

              <label className="field-label field-label--spaced">Rango de precio</label>
              <div className="input-wrap select-wrap">
                <img src="./src/assets/wallet.svg" alt="rango precio" className="input-icon" />
                <select
                  className="input-field select-field"
                  name="rangoPrecio"
                  value={form.rangoPrecio}
                  onChange={handleChange}
                  required={role === "profesional"}
                  aria-label="Rango de precio"
                >
                  <option value="">Seleccioná un rango de precios</option>
                  <option value="0-499">Hasta $499</option>
                  <option value="500-999">$500 - $999</option>
                  <option value="1000-1999">$1.000 - $1.999</option>
                  <option value="2000+">Más de $2.000</option>
                </select>
              </div>

            </>
          )}


          {/* Email */}
          <label className="field-label">Correo electrónico</label>
          <div className="input-wrap">
            <img src="/src/assets/envelope.svg" alt="email" className="input-icon" />
            <input
              className="input-field"
              type="email"
              placeholder="nombre@correo.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contraseña */}
          <label className="field-label">Contraseña</label>
          <div className="input-wrap">
            <img src="/src/assets/lock.svg" alt="password" className="input-icon" />
            <input
              className="input-field"
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirmar password */}
          <label className="field-label">Repetir contraseña</label>
          <div className="input-wrap">
            <img src="/src/assets/lock.svg" alt="confirm" className="input-icon" />
            <input
              className="input-field"
              type="password"
              placeholder="Repite tu contraseña"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <p className="helper-text">La contraseña debe tener mínimo 8 caracteres y combinar letras y números.</p>

          {/* Mensajes de estado */}
          {error && <p className="helper-text" style={{ color: "red", marginBottom: 8 }}>{error}</p>}
          {success && <p className="helper-text" style={{ color: "green", marginBottom: 8 }}>Registro exitoso.</p>}

          <button type="submit" className="primary-btn">
            <img src="/src/assets/login.svg" alt="signup" className="btn-left-icon" />
            Crear cuenta
          </button>

          <div className="form-footer">
            <Link to="/" className="muted-link">Volver al inicio</Link>
            <Link to="/forgotpassword" className="muted-link">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </main>

      <footer className="login-footer">Copyright Turn Market</footer>
    </div>
  );
};

export default SignUp;