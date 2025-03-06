import React from 'react';
import heroImage from "../../logo/rb.png"; // Replace with your actual image path
import "@fontsource/opendyslexic"; 
import { useNavigate } from 'react-router';
const Home = () => {
 const navigate=useNavigate();
  

  const handleClick = () => {
    navigate('/dashboard');  
  }; 

  return (
    <>
      {/* Hero Section */}
   
      <section className="bg-[#DDD0C8] flex flex-col items-center justify-center h-screen mt-0 text-center font-dyslexic">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">Read, Learn, and Grow with Ease.</h1>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Helping Dyslexic Kids Overcome <br/> Reading Challenges.</h2>
      <button className="bg-[#323232] text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition">
        Start now!
      </button>
    </section>
      
      
      
    </>
  );
};

export default Home;
