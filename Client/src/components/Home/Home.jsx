import React from "react";
import "@fontsource/opendyslexic";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-[#e9c7b2] flex flex-col items-center justify-center w-full min-h-screen text-center font-dyslexic px-4 py-8 sm:py-12 animate-fadeIn"
        style={{ height: "100dvh" }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Read, Learn and Grow with Ease.
          </h1>

          {/* Subheading */}
          <h4 className="text-lg sm:text-2xl md:text-3xl font-medium text-gray-800 leading-tight">
            Helping Dyslexic Kids Overcome 
            <br className="hidden md:block" /> 
            Reading Challenges.
          </h4>

          {/* Button */}
          <button
            onClick={handleClick}
            className="bg-[#323232] text-white px-8 py-3 rounded-full text-lg sm:text-xl transition-transform transform hover:scale-105 hover:bg-gray-700 duration-300"
          >
            Start now!
          </button>
        </div>
      </section>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default Home;
