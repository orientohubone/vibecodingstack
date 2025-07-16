import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 80,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#3b82f6",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const canvasSize = useRef({ w: 0, h: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      initCanvas();
      animate();
      window.addEventListener("resize", initCanvas);
    }
    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color, refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (!canvasRef.current || !context.current) return;
    const parent = canvasRef.current.parentElement;
    if (!parent) return;
    canvasSize.current.w = parent.offsetWidth;
    canvasSize.current.h = parent.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.scale(dpr, dpr);
  };

  const drawCircle = (x: number, y: number, r: number, a: number) => {
    if (!context.current) return;
    context.current.beginPath();
    context.current.arc(x, y, r, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${hexToRgb(color).join(",")},${a})`;
    context.current.fill();
  };

  const drawParticles = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    for (let i = 0; i < quantity; i++) {
      const x = Math.random() * canvasSize.current.w;
      const y = Math.random() * canvasSize.current.h;
      const r = Math.random() * size + 0.5;
      drawCircle(x, y, r, 0.3);
      circles.current.push({ x, y, r });
    }
  };

  const animate = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    circles.current.forEach((c) => {
      c.x += vx;
      c.y += vy;
      if (c.x > canvasSize.current.w) c.x = 0;
      if (c.y > canvasSize.current.h) c.y = 0;
      drawCircle(c.x, c.y, c.r, 0.4);
    });
    requestAnimationFrame(animate);
  };

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    }
    const intVal = parseInt(hex, 16);
    return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
  };

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
