import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  
  const speed = 0.8;
  const colors = ["white, red", "white, blue", "white, purple", "white, pink"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + speed;
        if (newProgress >= 100) {
          setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
          return 0;
        }
        return newProgress;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.background = `linear-gradient(0deg, ${colors[colorIndex]})`;
      boxRef.current.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${progress}%, 0% ${progress}%)`;
    }
  }, [progress, colorIndex]);

  return (
    <div className="container">
      <div ref={boxRef} className="box"></div>
    </div>
  );
};

export default App;
