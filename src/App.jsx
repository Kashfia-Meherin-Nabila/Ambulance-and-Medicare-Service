
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import HospitalSelection from './pages/HospitalSelection'
import RequestAmbulance from './pages/RequestAmbulance'
import Fare from './pages/Fare'
import Tracking from './pages/Tracking'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <BrowserRouter>
      {/* <Home /> */}
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospitalSelection" element={<HospitalSelection />} />
        <Route path="/requestAmbulance" element={<RequestAmbulance />} />
        <Route path="/fare" element={<Fare />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer/>

    </BrowserRouter>
    </>
  )
}

export default App
