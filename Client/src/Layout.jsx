import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Chatbot from './components/dashboard/Chatbot'

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer /> 
        <Chatbot/>
    </>
  )
}

export default Layout
