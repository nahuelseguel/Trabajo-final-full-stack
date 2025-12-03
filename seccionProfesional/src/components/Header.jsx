import React from 'react';

const Header = () => {
  return (
    <header className="encabezado-panel">
      <div className="izquierda-encabezado">
        <span className="logo-app">📅 Turn Market • Profesional</span>
      </div>
      <div className="derecha-encabezado">
        <button className="boton-perfil">
          <span className="icono-usuario">👤</span> Mi perfil
        </button>
      </div>
    </header>
  );
};

export default Header;