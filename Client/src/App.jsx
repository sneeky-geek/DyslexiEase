// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Chatbot from "./components/Chatbot"; // make sure this path is correct

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
        
        </Routes>

        {/* 👇 Floating Gemini Chatbot available on all routes */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
