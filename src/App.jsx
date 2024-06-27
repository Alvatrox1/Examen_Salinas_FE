import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlumnoForm from './components/AlumnoForm';
import MainDireccion from './components/MainDireccion';
import DireccionForm from './components/DireccionForm';
import MainAlumno from './components/MainAlumno';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDireccion />} />
        <Route path="alumnos" element={ <MainAlumno />} />
        <Route path="agregarAlumno/" element={ <AlumnoForm />} />
        <Route path="updateAlumno/:idAlumno" element={ <AlumnoForm />} />
        <Route path="direcciones" element={ <MainDireccion />} />
        <Route path="agregarDireccion" element={ <DireccionForm />} />
        <Route path="updateDireccion/:idDireccion" element={ <DireccionForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
