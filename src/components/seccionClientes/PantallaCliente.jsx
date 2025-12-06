import React, { useState, useEffect } from 'react'
import { Card } from "./Card/Card.jsx"
import profesiones from "./Card/profesiones.json"
import "../seccionClientes/pantallaPrincipal.css"

//el boton buscar no tiene accion 

export const PantallaCliente = () => {


    const [solicitudesTurnos, setSolicitudesTurnos] = useState([]);
    const [turnoAceptado, setTurnoAceptado] = useState([]);
    const [turnosRechazados, setTurnosRechazados] = useState([]);

    const cliente = JSON.parse(localStorage.getItem("usuario"));
    const idCliente = cliente?.id

    useEffect(() => {
        const traerTurnos = async () => {
            const res = await fetch("http://localhost:4000/turnos");
            const data = await res.json();

            const misTurnos = data.filter(turno => turno.clienteId === idCliente);

            const usuarios = await fetch("http://localhost:4000/usuarios");
            const listaUsuarios = await usuarios.json();

            const turnosProfesional = misTurnos.map(t => {
                const profesional = listaUsuarios.find(u => u.id === t.profesionalId)
                return { ...t, profesional };
            })


            setSolicitudesTurnos(turnosProfesional.filter(t => t.estado === "pendiente"))
            setTurnoAceptado(turnosProfesional.filter(t => t.estado === "confirmado"))
            setTurnosRechazados(turnosProfesional.filter(t => t.estado === "rechazado"))
        };

        traerTurnos();
    }, [idCliente]);


    const [busqueda, setBusqueda] = useState("")

    const handleChange = (e) => {
        setBusqueda(e.target.value)
    }

    const profesionesFiltradas = profesiones.filter((prof) => prof.profesion.toLowerCase().includes(busqueda.toLowerCase()))


    return (
        <>
            <div className='contenedor-pantalla'>

                <div className='contenedor-buscador'>
                    <input className='buscador-profesiones' onChange={handleChange} placeholder='Buscar una profesion...' type='text'></input>
                    <button>Buscar</button>
                </div>

                <div className='contenedor-cards'>
                    {profesionesFiltradas.map((p) => (
                        <Card imagen={p.imagen} profesion={p.profesion}></Card>
                    ))}
                </div>

                <div className='contenedor-turnos'>
                    <h2 className='texto-turnos'>Mis turnos</h2>

                    {solicitudesTurnos.map(s => (
                        <ul>
                            <li>Turno pedido a {s.profesional?.nombre} {s.profesional?.apellido} para el dia {s.fecha} a las {s.horario} se encuentra {s.estado}</li>
                          
                        </ul>
                    ))}

                    {turnoAceptado.map(s => (
                        <ul>
                            <li>Turno pedido a {s.profesional?.nombre} {s.profesional?.apellido} para el dia {s.fecha} a las {s.horario} se encuentra {s.estado}</li>
                        </ul>
                    ))}

                    {turnosRechazados.map(s => (
                        <ul>
                            <li>Turno pedido a {s.profesional?.nombre} {s.profesional?.apellido} para el dia {s.fecha} a las {s.horario} se encuentra {s.estado}</li>
                        </ul>
                    ))}

                      <button className='btn-vaciar' onClick={() => setTurnoAceptado([])}>Eliminar notificaciones de turnos aceptados</button>
                      <button className='btn-vaciar' onClick={() => setTurnosRechazados([])}>Eliminar notificaciones de turnos rechazados</button>
                </div>
            </div>
        </>
    )
}
