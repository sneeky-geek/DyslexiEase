import React from "react";
import { useNavigate } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RiskResultPage = ({ score = 4 }) => {
  const navigate = useNavigate();
  const isAtRisk = score < 5;

  const generateFactors = (score) => {
    const base = 10 - score;
    return {
      visualProcessing: base + Math.random() * 2,
      phonologicalAwareness: base + Math.random() * 1.5,
      workingMemory: base + Math.random() * 1,
      attentionSpan: base + Math.random() * 1.2,
      readingFluency: base + Math.random() * 1.7,
    };
  };

  const factors = generateFactors(score);

  const radarData = {
    labels: Object.keys(factors).map((f) =>
      f.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
    ),
    datasets: [
      {
        label: "Dyslexia Risk Profile",
        data: Object.values(factors),
        backgroundColor: "rgba(226, 0, 55, 0.4)",
        borderColor: "#e20037",
        pointBackgroundColor: "#e20037",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 12,
        ticks: { stepSize: 2, color: "#999" },
        grid: { color: "#ccc" },
        pointLabels: { font: { size: 13 }, color: "#444" },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-[#f9f8ff] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-[#3e3c61] text-center">
          🧠 Dyslexia Risk Assessment
        </h2>

        <p className="text-xl text-center">
          Your Score:{" "}
          <span className={isAtRisk ? "text-red-600" : "text-green-600"}>
            {score}/10
          </span>
        </p>

        <div
          className={`p-4 rounded-md border text-lg font-medium text-center ${
            isAtRisk
              ? "bg-red-100 text-red-800 border-red-300"
              : "bg-green-100 text-green-800 border-green-300"
          }`}
        >
          {isAtRisk
            ? "⚠️ Elevated risk of dyslexia detected. Professional consultation is highly recommended."
            : "✅ Low risk of dyslexia. No immediate action required, but continue monitoring."}
        </div>

        <div className="text-center w-full">
          <h3 className="text-lg font-semibold mb-2">
            Cognitive Risk Factors Breakdown
          </h3>
          <div className="w-full h-[400px]">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm">
          This radar chart simulates cognitive and perceptual stress points
          related to dyslexia based on your assessment score.
        </p>

        {/* 👇 Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-[#3e3c61] text-white rounded-xl hover:bg-[#2b2a4a] transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default RiskResultPage;
