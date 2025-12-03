import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Horarios.css'

const formatHour = (h) => `${h < 10 ? "0" : ""}${h}:00`;

const Horarios = ({ selectedDate, onTimeSelect }) => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);

  if (!selectedDate) navigate("/"); // Seguridad simple

  const arrHoras = [];
  for (let h = 8; h <= 20; h++) arrHoras.push(h);

  const handleTime = (hour) => {
    const timeStr = formatHour(hour);
    setSelectedTime(timeStr);
    onTimeSelect(timeStr);
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
};

export default Horarios;
