import React, { useEffect, useRef, useState } from "react";

// Load WebGazer in index.html:
// <script src="https://webgazer.cs.brown.edu/webgazer.js"></script>

const EyeTrackingTest = () => {
  const paragraph =
    "The quick brown fox jumps over the lazy dog. Peter baked a batch of blueberry pancakes with banana pieces.";
  const paragraphRef = useRef(null);
  const [gazeData, setGazeData] = useState([]);
  const [wordPositions, setWordPositions] = useState([]);
  const [tracking, setTracking] = useState(false);

  // Get word positions on load
  useEffect(() => {
    setTimeout(() => {
      const positions = [];
      const words = paragraph.split(" ");
      words.forEach((word, i) => {
        const el = document.getElementById(`word-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          positions.push({
            word,
            index: i,
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }
      });
      setWordPositions(positions);
    }, 500);
  }, []);

  // Start / Stop Eye Tracking
  useEffect(() => {
    if (tracking) {
      console.log("✅ Eye tracking started");

      if (!window.webgazer) {
        console.error("❌ WebGazer not loaded!");
        return;
      }

      window.webgazer
        .setRegression("ridge")
        .setGazeListener((data, timestamp) => {
          if (!data) return;

          console.log(`👁 X: ${data.x}, Y: ${data.y}, Time: ${timestamp}`);

          const match = wordPositions.find(
            (word) =>
              data.x >= word.left &&
              data.x <= word.right &&
              data.y >= word.top &&
              data.y <= word.bottom
          );

          if (match) {
            console.log(`👀 Looking at: "${match.word}" (index ${match.index})`);
            setGazeData((prev) => {
              const updated = [...prev, { ...match, timestamp }];

              // 🧠 Detection Logic
              const recent = updated.slice(-10); // recent 10 points
              const wordFreq = {};
              recent.forEach((g) => {
                wordFreq[g.word] = (wordFreq[g.word] || 0) + 1;
              });

              // 🔁 Fixation / Hesitation
              for (const [word, count] of Object.entries(wordFreq)) {
                if (count > 5) {
                  console.log(`🔁 Fixation detected on "${word}"`);
                }
              }

              // ⏭️ Line Skipping
              if (recent.length >= 2) {
                const dy = recent[recent.length - 1].top - recent[recent.length - 2].top;
                if (Math.abs(dy) > 40) {
                  console.log(`⏭️ Possible line skip! (ΔY = ${dy.toFixed(2)} px)`);
                }
              }

              // 🔄 Letter Confusion
              const confusionLetters = ["b", "d", "p", "q"];
              const wordLower = match.word.toLowerCase();
              const isConfusion = confusionLetters.some((ch) =>
                wordLower.includes(ch)
              );
              const repeatCount = updated.filter((w) => w.word === match.word).length;
              if (isConfusion && repeatCount > 3) {
                console.log(`🔄 Possible letter reversal confusion with "${match.word}"`);
              }

              return updated;
            });
          }
        })
        .begin();

      window.webgazer.showVideoPreview(true).showPredictionPoints(true);
    } else {
      console.log("🛑 Stopping eye tracking...");
      if (window.webgazer && typeof window.webgazer.end === "function") {
        try {
          window.webgazer.end();
          setTimeout(() => {
            window.webgazer.showVideoPreview(false).showPredictionPoints(false);
          }, 500);
        } catch (err) {
          console.error("⚠️ Error stopping WebGazer:", err);
        }
      }
    }
  }, [tracking, wordPositions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.webgazer && typeof window.webgazer.end === "function") {
        try {
          window.webgazer.end();
        } catch (err) {
          console.error("⚠️ Cleanup error with WebGazer:", err);
        }
      }
    };
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      {/* 📖 Reading Area */}
      <div className="bg-orange-500 text-black p-8 rounded-lg shadow-lg w-3/4 text-center">
        <p className="text-2xl font-semibold">
          {paragraph.split(" ").map((word, i) => (
            <span key={i} id={`word-${i}`} className="inline-block mx-1">
              {word}
            </span>
          ))}
        </p>
        {/* 🟢 Start/Stop Button */}
        <button
          className="bg-white text-black font-bold py-2 px-6 rounded-lg mt-4"
          onClick={() => setTracking((prev) => !prev)}
        >
          {tracking ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default EyeTrackingTest;
