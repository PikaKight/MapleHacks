import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';


import Home from './componets/home';
import HomeAuth from './componets/homeAuth';
import Login from './componets/login'



function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Login/>} />
        <Route path="/homeauth" element={<HomeAuth/>} />
        <Route path="/account" element={<HomeAuth/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
