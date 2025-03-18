import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'

import Chatbot  from './components/dashboard/Chatbot.jsx'
import { Route } from 'react-router-dom'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        
        <Route path='dashboard/chatbot' element={<Chatbot/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <RouterProvider router={router} />
    
  </StrictMode>
);
