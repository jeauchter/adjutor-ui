import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Products from '../features/products/Products'
import Classes from '../features/products/classes/Classes'
import Departments from '../features/products/departments/Departments'
import Variants from '../features/products/variants/Variants'
import ProductTypes from '../features/products/productTypes/ProductType'
import Tags from '../features/products/tags/Tag'
import Audiences from '../features/products/audiences/Audience'
import Vendors from '../features/products/vendors/Vendor'
import Styles from '../features/products/styles/Style'


// The Main component renders routes
const Main = () => (
  <main>
    <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/products' Component={Products}/>
      <Route path='/products/class' Component={Classes}/>
      <Route path='/products/department' Component={Departments}/>
      <Route path='/products/variant' Component={Variants}/>
      <Route path='/products/product-type' Component={ProductTypes}/>
      <Route path='/products/tag' Component={Tags}/>
      <Route path='/products/audience' Component={Audiences}/>
      <Route path='/products/vendor' Component={Vendors}/>
      <Route path='/products/style' Component={Styles}/>
    </Routes>
  </main>
)

export default Main
