import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Turnos = () => {

    const location = useLocation()
    const profesional = location.state


    return (
        <div>
            <h2>Turnos disponibles de {profesional.nombre}</h2>
        </div>
    )
}
