import React from 'react';
import { useNavigate } from "react-router-dom";
import './Confirmacion.css'

const Confirmacion = ({ finalSelection }) => {
  const navigate = useNavigate();

  if (!finalSelection.date) navigate("/");

  return (
    <div className="confirmation-container">
      <h2>¡Cita Confirmada!</h2>
      <p>Fecha: {finalSelection.date.toLocaleDateString()}</p>
      <p>Hora: {finalSelection.time}</p>

      <button onClick={() => navigate("/")}>
        Hacer otra reserva
      </button>
    </div>
  );
};

export default Confirmacion;
