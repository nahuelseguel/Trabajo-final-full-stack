import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Horarios.css'
import Swal from 'sweetalert2';
import Calendario from '../calendario/Calendario';

const formatHour = (h) => `${h < 10 ? "0" : ""}${h}:00`;

//modifica el formato de horario para poder filtrar el json
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};


const Horarios = ({ selectedDate, onTimeSelect }) => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));


  const location = useLocation()
  const { profesionalId } = location.state

  if (!selectedDate) navigate("/"); // Seguridad simple

  const addDb = async (timeStr) => {
    const turno = {
      profesionalId,
      clienteId: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fecha: formatDate(selectedDate), //uso la funcion que modifica
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


  const handleTime = async (hour) => {
    const timeStr = formatHour(hour);
    const fechaStr = formatDate(selectedDate) //guardo en una constante el horario modificado

    //verifico en la url si existe un turno igual
    const verificarTurno = await fetch(`http://localhost:4000/turnos?profesionalId=${profesionalId}&clienteId=${usuario.id}&fecha=${fechaStr}&horario=${timeStr}`)
    const turnoVerificado = await verificarTurno.json()

    //si hay coincidencias, envia una alerta y no se envia a la db
    if (turnoVerificado.length > 0) {
      Swal.fire({
                      title: 'Ya solicitaste un turno para esta fecha',
                      icon: 'error',
                      // evita que se cierre al hacer click fuera del cartel
                      allowOutsideClick: false,
                      // Colores personalizados de la alerta
                      confirmButtonColor: 'rgba(0, 89, 255, 1)',
                      denyButtonColor: '#b0b0b0',
                      background: '#ffffff',
                      color: '#333',
                  });
      return
    }

    setSelectedTime(timeStr);
    onTimeSelect(timeStr);
    addDb(timeStr)
    navigate("/confirmacion");
  };



  return (
    <div className='contenedor-horarios'>
      <div className="time-selector-container">
        <h3 className='header-mensaje'>Estas pidiendo un turno para el {selectedDate.toLocaleDateString()}</h3>
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
