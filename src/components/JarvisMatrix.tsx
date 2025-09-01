import { useEffect, useState } from "react";

interface MatrixChar {
  id: string;
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

export const JarvisMatrix = () => {
  const [matrixChars, setMatrixChars] = useState<MatrixChar[]>([]);

  useEffect(() => {
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ※◐◑◒◓→←↑↓▲▼◆◇◈◉○●◎⦿⦾";
    const columns = Math.floor(window.innerWidth / 20);
    
    const generateMatrixChars = () => {
      const newChars: MatrixChar[] = [];
      
      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.98) { // Sparse matrix effect
          newChars.push({
            id: `matrix-${i}-${Date.now()}`,
            char: chars[Math.floor(Math.random() * chars.length)],
            x: i * 20,
            y: Math.random() * window.innerHeight,
            speed: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
          });
        }
      }
      
      return newChars;
    };

    const interval = setInterval(() => {
      setMatrixChars(prev => {
        const newChars = generateMatrixChars();
        const updatedChars = prev
          .map(char => ({
            ...char,
            y: char.y + char.speed,
            opacity: char.opacity - 0.01,
          }))
          .filter(char => char.y < window.innerHeight + 50 && char.opacity > 0);
        
        return [...updatedChars, ...newChars].slice(-50); // Limit total chars
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {matrixChars.map(char => (
        <div
          key={char.id}
          className="absolute text-ai-matrix font-mono text-sm select-none"
          style={{
            left: char.x,
            top: char.y,
            opacity: char.opacity,
            textShadow: `0 0 10px hsl(var(--ai-matrix) / ${char.opacity})`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};