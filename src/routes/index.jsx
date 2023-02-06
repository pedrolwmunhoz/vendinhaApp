import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Clients from '../pages/Clients'
import Home from '../pages/Home'
import SaleList from '../pages/SaleList'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/vendas" element={<SaleList />} />
        <Route path="/clientes" element={<Clients />} />
    </Routes>
  )
}

export default AppRoutes