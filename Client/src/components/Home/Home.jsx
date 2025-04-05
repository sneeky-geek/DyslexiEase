import React from "react";
import "@fontsource/opendyslexic";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleDiagnosis = () => {
    navigate("/diagnosis"); // ✅ Navigate to diagnosis quiz
  };

  const handleEyeTest = () => {
    navigate("/EyeTrackingTest");
  };
  const handleCanvas = () => {
    navigate("/canvas"); // ✅ Navigate to canvas
  }

  return (
    <>
      <section
        className="bg-[#e9c7b2] flex flex-col items-center justify-center w-full min-h-screen text-center font-dyslexic px-4 py-8 sm:py-12 animate-fadeIn"
        style={{ height: "100dvh" }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Read, Learn and Grow with Ease.
          </h1>

          <h4 className="text-lg sm:text-2xl md:text-3xl font-medium text-gray-800 leading-tight">
            Helping Dyslexic Kids Overcome 
            <br className="hidden md:block" /> 
            Reading Challenges.
          </h4>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleClick}
              className="bg-[#323232] text-white px-8 py-3 rounded-full text-lg sm:text-xl transition-transform transform hover:scale-105 hover:bg-gray-700 duration-300"
            >
              Start now!
            </button>

            <button
              onClick={handleDiagnosis}
              className="bg-[#323232] text-white px-8 py-3 rounded-full text-lg sm:text-xl transition-transform transform hover:scale-105 hover:bg-gray-700 duration-300"
            >
              Take Test
            </button>

            <button
              onClick={handleEyeTest}
              className="bg-[#323232] text-white px-8 py-3 rounded-full text-lg sm:text-xl transition-transform transform hover:scale-105 hover:bg-gray-700 duration-300"
            >
              Eye Tracking
            </button>
          </div>
        </div>
      </section>

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
      <button onClick={handleCanvas}>canvas</button>
    </>
  );
};

export default Home;
