// main.jsx
import React from "react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Chatbot from './components/dashboard/Chatbot.jsx';
import { AuthProvider } from './components/AuthContext';
import EyeTrackingTest from './components/Home/EyeTrackingTest.jsx';
import Diagnosis from './components/Diagnosis/Diagnosis.jsx'; // ✅ Import Diagnosis
import Canvas from './components/Home/Canvas.jsx'; // ✅ Import Canvas
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='dashboard/chatbot' element={<Chatbot />} />
      <Route path='EyeTrackingTest' element={<EyeTrackingTest />} />
     <Route path='canvas' element={<Canvas />} /> {/* ✅ Added Canvas route */}
      <Route path='diagnosis' element={<Diagnosis />} /> {/* ✅ Added Diagnosis route */}
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
