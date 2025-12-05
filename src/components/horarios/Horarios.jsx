import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Horarios.css'
import Calendario from '../calendario/Calendario';

const formatHour = (h) => `${h < 10 ? "0" : ""}${h}:00`;

const Horarios = ({ selectedDate, onTimeSelect }) => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!selectedDate) navigate("/"); // Seguridad simple

  const addDb = async () => {
    const [turno, setTurno] = useState({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fecha: selectedDate,
      horario: selectedTime
    })
    await fetch('http://localhost:4000/turnos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(turno),
      })
  };

  const arrHoras = [];
  for (let h = 8; h <= 20; h++) arrHoras.push(h);

  const handleTime = (hour) => {
    const timeStr = formatHour(hour);
    setSelectedTime(timeStr);
    onTimeSelect(timeStr);
    addDb()
    navigate("/confirmacion");
  };

  return (
    <div className="time-selector-container">
      <p>Cita para: {selectedDate.toLocaleDateString()}</p>

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
  );
}

export default Horarios;
