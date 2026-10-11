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

// Tope de densidad en pantallas chicas: el cálculo de distancias es O(n²) por frame, así que
// un canvas con 100 partículas cuesta lo mismo que tres. El caller puede pedir más; acá se
// recorta. No cambia la API pública.
const MOBILE_MAX_DOTS = 40;
const MOBILE_MAX_LINES = 90;

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

    // Con `prefers-reduced-motion` no arrancamos ningún RAF: el canvas queda vacío y el
    // wrapper (ParticlesLayer) muestra un gradiente estático en su lugar.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dotCount = isMobile ? Math.min(dots, MOBILE_MAX_DOTS) : dots;
    const lineCount = isMobile ? Math.min(lines, MOBILE_MAX_LINES) : lines;

    const particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < dotCount; i++) {
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

    let rafId = 0;
    let cancelled = false;

    const animate = () => {
      if (cancelled) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = particleColor;

      particles.forEach((p, i) => {
        context.fillRect(p.x - particleSize / 2, p.y - particleSize / 2, particleSize, particleSize);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineCount) drawLine(p, p2);
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width || p.x < 0) p.vx *= -1;
        if (p.y > canvas.height || p.y < 0) p.vy *= -1;
      });

      rafId = requestAnimationFrame(animate);
    };

    // `cancelled` + `cancelAnimationFrame` en el cleanup: sin esto el loop sigue vivo después
    // del unmount y cada remount (scroll largo, cambio de ruta) apila otro callback.
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [dots, lines, particleSize, particleColor, lineColor]);

  return (
    <div ref={containerRef} className="relative w-full h-full top-0 left-0">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
      {children}
    </div>
  );
};

export default ParticlesBackground;
