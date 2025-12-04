import React, { useEffect, useState } from 'react'
import { CardProfesional } from './CardProfesional/CardProfesional'
import personas from "./CardProfesional/personas.json"
import "./pantallaProfesional.css"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'

//LOS PROFESIONALES LOS TENGO QUE RECORRER DEL JSON SERVER. (actualmente muestro profesionales harcodeados en un json)

export const PantallaProfesionales = () => {

  //hooks que permite leer el valor de la url dinamica (clave profesion - archivo profesiones.js)
  const { profesion } = useParams();

  /*  CODIGO PARA TRAER LOS DATOS DEL SERVER JSON*/
  const [personas, setPersonas] = useState([])

  let traerUsuarios = async () => {
    const response = await fetch("http://localhost:4000/usuarios");
    const personas = await response.json();
    setPersonas(personas)
  }

  useEffect(() => {
    traerUsuarios()
  }, [])


  //creo una constante en donde:
  //filtro: dentro del array donde estan las personas(array del archivo personas.js) la profesion
  //e igualo con los que coincidan con nombre, que es el valor que obtiene de la url dinamica
  //por lo tanto, guarda la profesiones que coincida en filtrados.
  //por ultimo mapeo filtrados para mostrar las cards
  const filtrados = personas.filter((p) => p.profesion?.toLowerCase() === profesion.toLowerCase());

  return (
    <div className='contenedor-pantalla-profesionales'>
      <div className='contenedor-volver-atras'>
        <Link className='link' to="/clientes"> <button className='btn-volver'>← Volver</button></Link>
        <p>Profesionales • {profesion} </p>
      </div>

      <div className='contenedor-card-personas'>
        {filtrados.map((p) => (
          <CardProfesional
            imagen={p.imagen}
            nombre={p.nombre}
            precio={p.rangoPrecio}
          />
        ))}
      </div>

      <div>

      </div>
    </div>
  )
}
