import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Chatbot from './components/dashboard/Chatbot.jsx';
import { Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import User from './components/dashboard/User.jsx';
import Random from './components/dashboard/Random.jsx';
import EyeTrackingTest from './components/Home/EyeTrackingTest.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='dashboard/chatbot' element={<Chatbot />} />
      <Route path='EyeTrackingTest' element={<EyeTrackingTest />} />
      <Route path='user' element={<User />} />
      <Route path='random' element={<Random />} />
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
