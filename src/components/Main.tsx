import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Products from '../products/Products'
import Classes from '../products/Classes'


// The Main component renders routes
const Main = () => (
  <main>
    <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/products' Component={Products}/>
      <Route path='/products/class' Component={Classes}/>
    </Routes>
  </main>
)

export default Main
