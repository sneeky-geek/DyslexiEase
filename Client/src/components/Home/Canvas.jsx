import React, { useRef, useState, useEffect } from 'react';

const TraceCanvas = ({ word = 'bad' }) => {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [result, setResult] = useState('');

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: x - rect.left, y: y - rect.top };
  };

  const startStroke = (e) => {
    setDrawing(true);
    setCurrentStroke([getPos(e)]);
  };

  const draw = (e) => {
    if (!drawing) return;
    const pos = getPos(e);
    setCurrentStroke((prev) => [...prev, pos]);

    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    const last = currentStroke[currentStroke.length - 1];
    if (last) {
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const endStroke = () => {
    setDrawing(false);
    analyzeStroke();
    setCurrentStroke([]);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawWord();
    setResult('');
  };

  const drawWord = () => {
    const bgCtx = bgCanvasRef.current.getContext('2d');
    bgCtx.fillStyle = 'black';
    bgCtx.fillRect(0, 0, bgCanvasRef.current.width, bgCanvasRef.current.height);

    bgCtx.font = 'bold 160px Arial';
    bgCtx.fillStyle = 'white';
    bgCtx.textAlign = 'center';
    bgCtx.textBaseline = 'middle';
    bgCtx.fillText(word, bgCanvasRef.current.width / 2, bgCanvasRef.current.height / 2);

    const visibleCtx = canvasRef.current.getContext('2d');
    visibleCtx.drawImage(bgCanvasRef.current, 0, 0);
  };

  const analyzeStroke = () => {
    const traceData = canvasRef.current.getContext('2d').getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const wordData = bgCanvasRef.current.getContext('2d').getImageData(0, 0, bgCanvasRef.current.width, bgCanvasRef.current.height);

    let tracedOnWhite = 0;
    let tracedOnBlack = 0;

    for (let i = 0; i < traceData.data.length; i += 4) {
      const [r, g, b] = [
        traceData.data[i],
        traceData.data[i + 1],
        traceData.data[i + 2],
      ];

      const tracedGreen = g > 180 && r < 100 && b < 100;
      const isWhite = wordData.data[i] > 200 && wordData.data[i + 1] > 200 && wordData.data[i + 2] > 200;

      if (tracedGreen) {
        if (isWhite) tracedOnWhite++;
        else tracedOnBlack++;
      }
    }

    const totalTraced = tracedOnWhite + tracedOnBlack;
    const whiteRatio = tracedOnWhite / (totalTraced || 1);

    if (totalTraced > 300 && whiteRatio >= 0.85) {
      setResult('Correct');
    } else {
      setResult('Wrong');
    }
  };

  useEffect(() => {
    drawWord();
  }, [word]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas ref={bgCanvasRef} width={600} height={300} style={{ display: 'none' }} />

      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        style={{ border: '3px solid black', backgroundColor: 'black', touchAction: 'none' }}
        onMouseDown={startStroke}
        onMouseMove={draw}
        onMouseUp={endStroke}
        onMouseLeave={endStroke}
        onTouchStart={startStroke}
        onTouchMove={draw}
        onTouchEnd={endStroke}
      />

      <button
        onClick={clearCanvas}
        className="bg-gray-300 px-4 py-2 rounded font-semibold"
      >
        Clear
      </button>

      {result && (
        <div className="text-xl font-bold">
          ✏️ Your tracing is: <span className={result === 'Correct' ? 'text-green-500' : 'text-red-600'}>{result}</span>
        </div>
      )}
    </div>
  );
};

export default TraceCanvas;
