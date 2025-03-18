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
      {/* Hero Section - Fullscreen Fix */}
      <section
        className="bg-[#e9c7b2] flex flex-col items-center justify-center w-full min-h-screen text-center font-dyslexic m-0 p-0"
        style={{ height: "100dvh" }} // Ensures full height on all devices
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Read, Learn, and Grow with Ease.
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
          Helping Dyslexic Kids Overcome <br className="hidden md:block" /> Reading Challenges.
        </h2>
        <button
          onClick={handleClick}
          className="bg-[#323232] text-white w-full sm:w-auto px-6 py-3 rounded-lg text-lg sm:text-xl hover:bg-gray-700 transition"
        >
          Start now!
        </button>
      </section>
    </>
  );
};

export default Home;
