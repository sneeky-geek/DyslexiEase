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
        backgroundColor: isAtRisk ? "rgba(226, 0, 55, 0.2)" : "rgba(34, 139, 34, 0.2)",
        borderColor: isAtRisk ? "#e20037" : "#228B22",
        pointBackgroundColor: isAtRisk ? "#e20037" : "#228B22",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 12,
        ticks: { 
          stepSize: 2, 
          color: "#666",
          font: {
            family: "'Roboto', sans-serif",
          }
        },
        grid: { color: "#ddd" },
        angleLines: { color: "#ccc" },
        pointLabels: { 
          font: { 
            size: 14, 
            family: "'Roboto', sans-serif",
            weight: 500
          }, 
          color: "#323232" 
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#323232",
        titleFont: {
          family: "'Roboto', sans-serif",
          weight: 600,
          size: 14
        },
        bodyColor: "#323232",
        bodyFont: {
          family: "'Roboto', sans-serif",
          size: 13
        },
        borderColor: "#ccc",
        borderWidth: 1,
        caretSize: 6,
        cornerRadius: 6,
        displayColors: false,
      }
    },
  };

  const factorDescriptions = {
    "Visual Processing": "Ability to interpret visual information and symbols",
    "Phonological Awareness": "Understanding and manipulation of speech sounds",
    "Working Memory": "Short-term memory for processing information",
    "Attention Span": "Ability to maintain focus over time",
    "Reading Fluency": "Speed and accuracy of reading"
  };

  const recommendations = isAtRisk ? [
    "Schedule an evaluation with a certified educational psychologist",
    "Consider specialized tutoring in phonics-based reading instruction",
    "Explore assistive technologies for reading support",
    "Practice daily reading exercises designed for dyslexia intervention"
  ] : [
    "Continue regular reading practices",
    "Monitor for any changes in reading ability or comprehension",
    "Consider periodic reassessment every 6-12 months",
    "Engage in diverse reading materials to strengthen skills"
  ];

  return (
    <div className="min-h-screen bg-dyslexia-bg font-roboto text-dyslexia-text p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-[#3e3c61] to-[#5d5b8d] p-6 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">
            Dyslexia Risk Assessment Results
          </h2>
        </div>

        <div className="p-6 md:p-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-6 md:order-2">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Your Score</h3>
              <div className="flex items-center justify-center md:justify-start">
                <div className={`text-4xl font-bold ${isAtRisk ? "text-red-600" : "text-green-600"}`}>
                  {score}/10
                </div>
                <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isAtRisk
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {isAtRisk ? "At Risk" : "Low Risk"}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${
              isAtRisk
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-green-50 text-green-800 border-green-200"
            }`}>
              <h3 className="font-semibold mb-2 flex items-center">
                {isAtRisk ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Assessment Outcome
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Assessment Outcome
                  </>
                )}
              </h3>
              <p>
                {isAtRisk
                  ? "Several risk markers for dyslexia have been identified. Professional evaluation is recommended for a comprehensive diagnosis."
                  : "Your responses indicate a low probability of dyslexia-related challenges. Continue with regular literacy development."}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 md:order-1">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-center">Cognitive Risk Factors</h3>
              <div className="aspect-square max-h-[400px] animate-pulse-gentle">
                <Radar data={radarData} options={radarOptions} />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="mb-2 text-center italic">Hover over data points for more details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  {Object.keys(factorDescriptions).map((factor, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded border border-gray-100">
                      <span className="font-medium">{factor}:</span> {factorDescriptions[factor]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center md:text-left">
            This assessment provides preliminary insights only and is not a diagnostic tool.
            Always consult with healthcare professionals for proper evaluation.
          </p>
          
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#3e3c61] text-white rounded-lg hover:bg-[#2b2a4a] transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskResultPage;