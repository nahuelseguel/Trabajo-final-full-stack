import React from 'react'
import "./cardProfesional.css"
import { Link } from 'react-router-dom'

export const CardProfesional = ({ imagen, nombre, precio }) => {
    return (
        <div>
            <div className='contenedor-card-profesional'>

                <div className='contenedor-foto-nombre'>
                    <img className='imagen-card-persona' src={imagen} alt="foto-persona" />

                    <h3 className='nombre-persona'>{nombre}</h3>
                </div>

                <p className='rango-precio'>Rango del presupuesto: {precio}</p>
                {/*falta enlazar en el link del boton pedir turno la seccion de los turnos disponibles
                state lleva los datos a la url de to y se recibe con location */}
                <Link className='link' to="/turnos" state={{ nombre, imagen, precio }}><button className='btn-turno'>Pedir turno</button></Link>


            </div>
        </div>
    )
}
