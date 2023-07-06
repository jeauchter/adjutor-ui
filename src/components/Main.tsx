import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Products from '../products/Products'


// The Main component renders routes
const Main = () => (
  <main>
    <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/products' Component={Products}/>
    </Routes>
  </main>
)

export default Main