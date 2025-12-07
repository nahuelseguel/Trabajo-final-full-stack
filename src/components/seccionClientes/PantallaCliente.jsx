import React, { useState, useEffect } from 'react'
import { Card } from "./Card/Card.jsx"
import profesiones from "./Card/profesiones.json"
import "../seccionClientes/pantallaPrincipal.css"
import Logout from '../Logout.jsx'

export const PantallaCliente = () => {

//estados para guardar los estados de los turnos
    const [solicitudesTurnos, setSolicitudesTurnos] = useState([]);
    const [turnoAceptado, setTurnoAceptado] = useState([]);
    const [turnosRechazados, setTurnosRechazados] = useState([]);

    //guardo el id del cliente logueado
    const cliente = JSON.parse(localStorage.getItem("usuario"));
    const idCliente = cliente?.id


//traigo los turnos de la db, los guardo en "res" y luego lo guardo en "data" convertido a json
//guardo en "mis turnos" los turnos que coincidan al cliente (uso el id de la db de turno con el id que obtengo del localStorage del cliente logueado)

//traigo los usuarios logueados
//recorro y busco que el id del usuario sea al mismo al que figura en el turno (profesionaId)
//en el return lo que hago es dejar los datos del turno y agregarle un nuevo objeto que es el profesional que corresponda
//por lo tanto turnosProfesionl contiene datos del turno y datos del profesional
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

//lleno los useState dependiendo el estado del turno
            setSolicitudesTurnos(turnosProfesional.filter(t => t.estado === "pendiente"))
            setTurnoAceptado(turnosProfesional.filter(t => t.estado === "confirmado"))
            setTurnosRechazados(turnosProfesional.filter(t => t.estado === "rechazado"))
        };

        traerTurnos();
    }, [idCliente]);


    //estado para guardar lo que ingresa el usuario
    const [busqueda, setBusqueda] = useState("")

    //obtengo el valor
    const handleChange = (e) => {
        setBusqueda(e.target.value)
    }

    //Filtro las profesiones del json que coincidan con lo que busca el usuario (uso toLowerCase para que coincidan minusculas)
    const profesionesFiltradas = profesiones.filter((prof) => prof.profesion.toLowerCase().includes(busqueda.toLowerCase()))


    return (
        <>
            <div className='contenedor-pantalla'>

                <div className="btn-logout" >
                    <Logout />
                </div>

                <div className="btn-logout-responsive" >
                    <Logout />
                </div>
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
                            <li>⚠️Turno pedido a {s.profesional?.nombre} {s.profesional?.apellido} para el dia {s.fecha} a las {s.horario} se encuentra {s.estado}</li>
                        </ul>
                    ))}

                    {turnoAceptado.map(s => (
                        <ul>
                            <li>✅Turno pedido a {s.profesional?.nombre} {s.profesional?.apellido} para el dia {s.fecha} a las {s.horario} fue {s.estado}. Ya te podes comunicar con el al {s.profesional?.telefono}</li>
                        </ul>
                    ))}

                    {turnosRechazados.map(s => (
                        <ul>
                            <li>❌Turno pedido a {s.profesional?.nombre} {s.profesional?.apellido} para el dia {s.fecha} a las {s.horario} fue rechazado {s.estado}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    )
}
