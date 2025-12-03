import Calendario from "./components/calendario/Calendario";
import Horarios from "./components/horarios/Horarios";
import Confirmacion from "./components/confirmacion/Confirmacion";
import { PantallaCliente } from './components/seccionClientes/PantallaCliente'
import { PantallaProfesionales } from './components/CardProfesionales/PantallaProfesionales'
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword"
import SignUp from "./Screens/SignUp"
import { Route, Routes } from 'react-router-dom'
import { Turnos } from './components/Turnos'
import AuthLayout  from '../src/layouts/AuthLayout.jsx';
import "../src/Style.css";


function App() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  //cree una url dinamica, :nombre va a cambiar segun la card que elije
  return (
    <>
      <Routes>
        <Route path="/calendario" element={<Calendario onDateSelect={(date) => setSelectedDate(date)} />} />
        <Route path="/horarios" element={<Horarios selectedDate={selectedDate} onTimeSelect={(time) => setSelectedTime(time)} />} />
        <Route path="/confirmacion" element={<Confirmacion finalSelection={{ date: selectedDate, time: selectedTime }} />} />
        <Route path="/turnos" element={<Turnos></Turnos>}></Route>
        <Route path="/cliente" element={<PantallaCliente></PantallaCliente>}></Route>
        <Route path="/profesion/:profesion" element={<PantallaProfesionales />}></Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
