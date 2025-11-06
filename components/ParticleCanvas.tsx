'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseRef.current.radius = (canvas.height / 110) * (canvas.width / 110);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      directionX: (Math.random() * 0.4) - 0.2,
      directionY: (Math.random() * 0.4) - 0.2,
      size: (Math.random() * 2) + 1,
      color: '#333333'
    });

    const initParticles = () => {
      particlesRef.current = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        particlesRef.current.push(createParticle(x, y));
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
      ctx.fillStyle = '#333333';
      ctx.fill();
    };

    const updateParticle = (particle: Particle) => {
      if (particle.x > canvas.width || particle.x < 0) {
        particle.directionX = -particle.directionX;
      }
      if (particle.y > canvas.height || particle.y < 0) {
        particle.directionY = -particle.directionY;
      }

      particle.x += particle.directionX;
      particle.y += particle.directionY;
      drawParticle(particle);
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          const dx = particlesRef.current[a].x - particlesRef.current[b].x;
          const dy = particlesRef.current[a].y - particlesRef.current[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(128,128,128,${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const particle of particlesRef.current) {
        updateParticle(particle);
      }
      
      connectParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}