import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Products from '../features/products/Products'
import Classes from '../features/products/classes/Classes'
import Departments from '../features/products/departments/Departments'
import Variants from '../features/products/variants/Variants'


// The Main component renders routes
const Main = () => (
  <main>
    <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/products' Component={Products}/>
      <Route path='/products/class' Component={Classes}/>
      <Route path='/products/department' Component={Departments}/>
      <Route path='/products/variant' Component={Variants}/>
    </Routes>
  </main>
)

export default Main
