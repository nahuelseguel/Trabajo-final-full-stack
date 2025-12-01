import React, { useState } from 'react'
import { Card } from "./Card/Card.jsx"
import profesiones from "./Card/profesiones.json"
import "../seccionClientes/pantallaPrincipal.css"

//el boton buscar no tiene accion 

export const PantallaCliente = () => {

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
            </div>
        </>
    )
}
