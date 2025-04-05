import React, { useEffect, useRef, useState } from "react";

const EyeTrackingTest = ({ onNext }) => {
  const paragraph = `The quick brown fox jumps over the lazy dog. 
  Peter baked a batch of blueberry pancakes with banana pieces. 
  People with dyslexia may confuse letters like b, d, p, and q or skip lines while reading.`;

  const paragraphRef = useRef(null);
  const [wordPositions, setWordPositions] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [gazeData, setGazeData] = useState([]);
  const [analysis, setAnalysis] = useState({
    totalWordsRead: 0,
    fixations: 0,
    lineSkips: 0,
    letterConfusions: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      const words = paragraph.split(" ");
      const positions = words
        .map((word, i) => {
          const el = document.getElementById(`word-${i}`);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            word,
            index: i,
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          };
        })
        .filter(Boolean);
      setWordPositions(positions);
    }, 500);
  }, []);

  useEffect(() => {
    if (!tracking || wordPositions.length === 0) return;

    if (!window.webgazer) {
      console.error("❌ WebGazer not loaded");
      return;
    }

    window.webgazer
      .setRegression("ridge")
      .setGazeListener((data, timestamp) => {
        if (!data) return;

        const match = wordPositions.find(
          (w) =>
            data.x >= w.left &&
            data.x <= w.right &&
            data.y >= w.top &&
            data.y <= w.bottom
        );

        if (match) {
          setGazeData((prev) => {
            const updated = [...prev, { ...match, timestamp }];
            const recent = updated.slice(-10);
            const freq = {};
            const seen = new Set();
            let fixations = 0;
            let lineSkips = 0;
            let letterConfusions = 0;

            recent.forEach((g) => {
              freq[g.word] = (freq[g.word] || 0) + 1;
              seen.add(g.word);
            });

            for (const count of Object.values(freq)) {
              if (count > 5) fixations++;
            }

            if (recent.length >= 2) {
              const dy = Math.abs(
                recent[recent.length - 1].top - recent[recent.length - 2].top
              );
              if (dy > 40) lineSkips++;
            }

            const confusionLetters = ["b", "d", "p", "q"];
            const lower = match.word.toLowerCase();
            const isConfused = confusionLetters.some((c) => lower.includes(c));
            const repeats = updated.filter((g) => g.word === match.word).length;
            if (isConfused && repeats >= 3) letterConfusions++;

            setAnalysis({
              totalWordsRead: seen.size,
              fixations,
              lineSkips,
              letterConfusions,
            });

            return updated;
          });
        }
      })
      .begin();

    window.webgazer.showVideoPreview(true).showPredictionPoints(true);

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, [tracking, wordPositions]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        🧠 Dyslexia Eye Tracking Diagnosis
      </h1>

      <div
        className="bg-yellow-100 text-black p-6 rounded-lg w-3/4 text-center"
        ref={paragraphRef}
      >
        <p className="text-lg leading-relaxed">
          {paragraph.split(" ").map((word, i) => (
            <span key={i} id={`word-${i}`} className="inline-block mx-1">
              {word}
            </span>
          ))}
        </p>
        <button
          onClick={() => setTracking((prev) => !prev)}
          className="mt-6 bg-[#170f3b] text-white px-6 py-2 rounded-lg"
        >
          {tracking ? "Stop Tracking" : "Start Tracking"}
        </button>
      </div>

     

      <button
        onClick={onNext}
        className="mt-6 bg-[#323232] text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Next
      </button>
    </div>
  );
};

export default EyeTrackingTest;
