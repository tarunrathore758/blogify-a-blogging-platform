import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'   // Footer import karo

const Layout = () => {
  return (
    <div>
      <Header/>
      <main style={{ minHeight: "80vh" }}>
        <Outlet/>
      </main>
      <Footer/>   
    </div>
  )
}

export default Layout
