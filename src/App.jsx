import { PantallaCliente } from './components/seccionClientes/PantallaCliente'
import { PantallaProfesionales } from './components/CardProfesionales/PantallaProfesionales'
import { Login } from "./Screens/Login";
import { ForgotPassword } from "./Screens/ForgotPassword"
import { SignUp } from "./Screens/SignUp"
import { Route, Routes } from 'react-router-dom'
import { Turnos } from './components/Turnos'

function App() {


  //cree una url dinamica, :nombre va a cambiar segun la card que elije
  return (
    <>
      <Routes>
        <Route path="/turnos" element={<Turnos></Turnos>}></Route>
        <Route path="/" element={<PantallaCliente></PantallaCliente>}></Route>
        <Route path="/profesion/:profesion" element={<PantallaProfesionales />}></Route>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
