import React, { useState } from 'react';
import Header from './Header';
import TarjetaSolicitudesTurnos from './TarjetaSolicitudesTurnos';
import AgendaDiaria from './AgendaDiaria';
import TarjetaCancelaciones from './TarjetaCancelaciones';
import TarjetaTurnosRechazados from './TarjetaTurnosRechazados';
import './PanelProfesional.css';

const PanelProfesional = () => {
  const [solicitudesTurnos, setSolicitudesTurnos] = useState([
    {
      id: 1,
      nombreCliente: "María García",
      fecha: "Jue 14:30",
      servicio: "Corte y peinado",
      estado: "pendiente",
      avatar: "MG"
    },
    {
      id: 2,
      nombreCliente: "Carlos López",
      fecha: "Vie 10:00",
      servicio: "Corte masculino",
      estado: "pendiente",
      avatar: "CL"
    },
    {
      id: 3,
      nombreCliente: "Ana Rodríguez",
      fecha: "Vie 16:45",
      servicio: "Coloración",
      estado: "confirmado",
      avatar: "AR"
    }
  ]);

  const [cancelaciones, setCancelaciones] = useState([
    {
      id: 1,
      nombreCliente: "Pedro Lima",
      fecha: "Ayer 09:15",
      servicio: "Coloración",
      estado: "cancelado",
      motivo: "imprevisto de último momento",
      avatar: "PL"
    }
  ]);

  //estado para los rechazados
  const [turnosRechazados, setTurnosRechazados] = useState([]);

  //Estado para la agenda del día
  const [citasDiarias, setCitasDiarias] = useState([
    {
      id: 101,
      nombreCliente: "Juan Pérez",
      hora: "9:30",
      servicio: "Corte masculino",
      estado: "confirmado",
      avatar: "JP"
    },
    {
      id: 102,
      nombreCliente: "María García",
      hora: "11:00",
      servicio: "Corte y peinado",
      estado: "confirmado",
      avatar: "MG"
    },
    {
      id: 103,
      nombreCliente: "Carlos López",
      hora: "14:30",
      servicio: "Coloración",
      estado: "pendiente",
      avatar: "CL"
    },
    {
      id: 104,
      nombreCliente: "Ana Rodríguez",
      hora: "16:45",
      servicio: "Tratamiento capilar",
      estado: "confirmado",
      avatar: "AR"
    }
  ]);

  // Función para manejar la aceptación de una solicitud
  const manejarAceptar = (id) => {
    const solicitudAceptada = solicitudesTurnos.find(solicitud => solicitud.id === id);
    
    setSolicitudesTurnos(prev => 
      prev.map(solicitud => 
        solicitud.id === id ? {...solicitud, estado: "confirmado"} : solicitud
      )
    );

    //Si se acepta una solicitud, agregarla a la agenda del día
    if (solicitudAceptada) {
      // Convertir la fecha de "Vie 16:45" a formato de hora "16:45"
      const hora = solicitudAceptada.fecha.split(' ')[1];
      
      setCitasDiarias(prev => [
        ...prev,
        {
          ...solicitudAceptada,
          hora: hora,
          estado: "confirmado"
        }
      ]);
    }
  };

  // Función para manejar el rechazo de una solicitud
  const manejarRechazar = (id) => {
    const solicitudRechazada = solicitudesTurnos.find(solicitud => solicitud.id === id);
    if (solicitudRechazada) {
      // Agregar a la lista de rechazados
      setTurnosRechazados(prev => [
        ...prev,
        {
          ...solicitudRechazada,
          estado: "rechazado",
          fechaRechazo: new Date().toLocaleDateString('es-ES', { 
            weekday: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        }
      ]);
      // Remover de las solicitudes
      setSolicitudesTurnos(prev => 
        prev.filter(solicitud => solicitud.id !== id)
      );
    }
  };

  // Función para manejar la cancelación de un turno confirmado
  const manejarCancelar = (id) => {
    const solicitudCancelada = solicitudesTurnos.find(solicitud => solicitud.id === id);
    if (solicitudCancelada) {
      // Agregar a la lista de cancelaciones
      setCancelaciones(prev => [
        ...prev,
        {
          ...solicitudCancelada,
          estado: "cancelado",
          motivo: "Cancelado por el profesional",
          fecha: new Date().toLocaleDateString('es-ES', { 
            weekday: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        }
      ]);
      // Remover de las solicitudes
      setSolicitudesTurnos(prev => 
        prev.filter(solicitud => solicitud.id !== id)
      );
      
      //También remover de la agenda si estaba allí
      setCitasDiarias(prev => 
        prev.filter(cita => cita.id !== id)
      );
    }
  };

  // Función para manejar la reprogramación de una cancelación
  const manejarReprogramar = (id) => {
    alert(`Reprogramar cita ${id}`);
  };

  // Función para restaurar un turno rechazado
  const manejarRestaurarRechazado = (id) => {
    const solicitudRestaurada = turnosRechazados.find(solicitud => solicitud.id === id);
    if (solicitudRestaurada) {
      // Agregar de nuevo a las solicitudes pendientes
      setSolicitudesTurnos(prev => [
        ...prev,
        {
          ...solicitudRestaurada,
          estado: "pendiente",
          fechaRechazo: undefined
        }
      ]);
      
      setTurnosRechazados(prev => 
        prev.filter(solicitud => solicitud.id !== id)
      );
    }
  };

  return (
    <div className="panel-profesional">
      <Header />
      <div className="contenido-panel">
        <TarjetaSolicitudesTurnos 
          solicitudes={solicitudesTurnos}
          onAceptar={manejarAceptar}
          onRechazar={manejarRechazar}
          onCancelar={manejarCancelar}
        />
        
        <AgendaDiaria citasDiarias={citasDiarias} />
        
        <TarjetaCancelaciones 
          cancelaciones={cancelaciones}
          onReprogramar={manejarReprogramar}
        />
        <TarjetaTurnosRechazados 
          turnosRechazados={turnosRechazados}
          onRestaurar={manejarRestaurarRechazado}
        />
      </div>
    </div>
  );
};

export default PanelProfesional;