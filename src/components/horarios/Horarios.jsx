import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Horarios.css'
import Calendario from '../calendario/Calendario';

const formatHour = (h) => `${h < 10 ? "0" : ""}${h}:00`;

const Horarios = ({ selectedDate, onTimeSelect }) => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const location = useLocation()
  const {profesionalId} = location.state

  if (!selectedDate) navigate("/"); // Seguridad simple

  const addDb = async (timeStr) => {
    const turno = {
      profesionalId,
      clienteId: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fecha: selectedDate,
      horario: timeStr,
      estado: "pendiente"
    }
    await fetch("http://localhost:4000/turnos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(turno)
    })
  }

  const arrHoras = [];
  for (let h = 8; h <= 20; h++) arrHoras.push(h);

  const handleTime = (hour) => {
    const timeStr = formatHour(hour);
    setSelectedTime(timeStr);
    onTimeSelect(timeStr);

    addDb(timeStr)

    navigate("/confirmacion");
  };


  return (
    <div className='contenedor-horarios'>
    <div className="time-selector-container">
      <h3 className='header-mensaje'>Estas pidiendo un turno para el { selectedDate.toLocaleDateString()}</h3>
            <h3 className='mensaje-seleccionar'>Selecciona un horario</h3>

      <div className="time-grid">
        {arrHoras.map((h) => (
          <button
            key={h}
            className="time-button"
            onClick={() => handleTime(h)}
          >
            {formatHour(h)}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Horarios;
