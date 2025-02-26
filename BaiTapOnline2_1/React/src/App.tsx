import React, { useEffect, useRef } from "react";
import "./App.css";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let radius = 10;
    const drawCircle = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
      radius += 1;
      if (radius < Math.min(canvas.width, canvas.height) / 2) {
        requestAnimationFrame(drawCircle);
      }
    };
    drawCircle();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ backgroundColor: "blue", width: "100vw", height: "100vh" }} />;
};

export default App;
