"use client"

import { ReactNode, useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
  dots?: number;            // Cantidad de partículas
  lines?: number;           // Distancia para unir partículas
  particleSize?: number;    // Tamaño de las partículas
  particleColor?: string;   // Color de las partículas
  lineColor?: string;       // Color de las líneas
  children?: ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const ParticlesBackground = ({
  dots = 50,
  lines = 100,
  particleSize = 4,
  particleColor = "#0091fd",
  lineColor = "rgba(0, 145, 255, 0.5)",
  children,
}: ParticlesBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < dots; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }

    const drawLine = (p1: Particle, p2: Particle) => {
      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.strokeStyle = lineColor;
      context.lineWidth = 1;
      context.stroke();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = particleColor;

      particles.forEach((p, i) => {
        context.fillRect(p.x - particleSize / 2, p.y - particleSize / 2, particleSize, particleSize);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lines) drawLine(p, p2);
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width || p.x < 0) p.vx *= -1;
        if (p.y > canvas.height || p.y < 0) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [dots, lines, particleSize, particleColor, lineColor]);

  return (
    <div ref={containerRef} className="relative w-full h-full top-0 left-0">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
      {children}
    </div>
  );
};

export default ParticlesBackground;
