import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import React from 'react';
import Predio from './componentes/telas/predio/Predio'

function App() {
  return (
    <BrowserRouter>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact="true" path="/predios" element={<Predio/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
