'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className = '' }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Determine if dark mode is active
    const isDarkMode = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    let animationFrameId: number;
    let time = 0;

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);

    // Animation colors - improved color palette for dark theme
    const darkModeColors = [
      { r: 147, g: 51, b: 234 },   // Purple (#9333EA - primary gradient start)
      { r: 0, g: 255, b: 133 },    // Muted Electric Green (#00FF85 - less harsh)
      { r: 219, g: 39, b: 119 },   // Magenta (#DB2777 - primary gradient end)
      { r: 0, g: 210, b: 255 },    // Softer Cyan
      { r: 236, g: 72, b: 153 },   // Pink
      { r: 139, g: 92, b: 246 }    // Violet
    ];
    
    const lightModeColors = [
      { r: 130, g: 71, b: 204 },   // Softer Purple
      { r: 46, g: 204, b: 16 },    // Softer Green
      { r: 204, g: 31, b: 67 },    // Softer Red
      { r: 0, g: 192, b: 204 },    // Softer Cyan
      { r: 204, g: 63, b: 181 },   // Softer Pink
      { r: 204, g: 171, b: 0 }     // Softer Yellow
    ];
    
    const colors = isDarkMode ? darkModeColors : lightModeColors;

    // Create gradient points
    const points: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number; g: number; b: number };
      phase: number;
      amplitude: number;
      glow: number;
    }> = [];
    
    // Create more points for a richer visual effect
    for (let i = 0; i < 15; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.12, // Slower for smoother movement
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 0.6 + 0.3, // Larger radius for more prominent effect
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2, // Random phase for oscillation
        amplitude: Math.random() * 0.5 + 0.2, // Increased amplitude for more dynamic movement
        glow: Math.random() * 15 + 10 // Random glow intensity for neon effect
      });
    }

    // Animation function
    const animate = () => {
      time += 0.004; // Even slower time progression for smoother animation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grain texture to background
      if (isDarkMode) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 3; // Reduced noise for softer texture
          data[i] = noise;     // r
          data[i+1] = noise;   // g
          data[i+2] = noise;   // b
          data[i+3] = 8;       // alpha (even more subtle)
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      // Move points with oscillation
      points.forEach(point => {
        // Add subtle oscillation to movement with custom amplitude
        point.x += point.vx + Math.sin(time + point.phase) * point.amplitude;
        point.y += point.vy + Math.cos(time + point.phase) * point.amplitude;

        // Wrap around edges instead of bouncing for smoother transitions
        if (point.x < -canvas.width * 0.1) point.x = canvas.width * 1.1;
        if (point.x > canvas.width * 1.1) point.x = -canvas.width * 0.1;
        if (point.y < -canvas.height * 0.1) point.y = canvas.height * 1.1;
        if (point.y > canvas.height * 1.1) point.y = -canvas.height * 0.1;
        
        // Occasionally change direction slightly for more organic movement
        if (Math.random() < 0.005) {
          point.vx += (Math.random() - 0.5) * 0.05;
          point.vy += (Math.random() - 0.5) * 0.05;
          
          // Keep velocity in reasonable bounds
          point.vx = Math.max(-0.3, Math.min(0.3, point.vx));
          point.vy = Math.max(-0.3, Math.min(0.3, point.vy));
        }
      });
      
      // Create gradients between points for vibrant neon effect
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const pointA = points[i];
          const pointB = points[j];
          
          const dx = pointB.x - pointA.x;
          const dy = pointB.y - pointA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connections between points that are close enough
          if (distance < canvas.width * 0.35) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / (canvas.width * 0.35);
            
            // Create gradient
            const gradient = ctx.createLinearGradient(
              pointA.x, pointA.y, pointB.x, pointB.y
            );
            
            // Add neon glow effect with higher opacity for dark mode
            const glowIntensity = isDarkMode ? 0.25 : 0.15;
            gradient.addColorStop(0, `rgba(${pointA.color.r}, ${pointA.color.g}, ${pointA.color.b}, ${opacity * glowIntensity})`);
            gradient.addColorStop(1, `rgba(${pointB.color.r}, ${pointB.color.g}, ${pointB.color.b}, ${opacity * glowIntensity})`);
            
            // Draw connection with glow effect
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(pointA.radius, pointB.radius) * 2.5 * opacity;
            
            // Add shadow for glow effect in dark mode
              if (isDarkMode) {
                ctx.shadowColor = `rgba(${pointA.color.r}, ${pointA.color.g}, ${pointA.color.b}, 0.5)`;
                ctx.shadowBlur = pointA.glow || 10;
              }
            
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.stroke();
            
            // Reset shadow
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );

      // Add color stops with animation
      points.forEach((point, i) => {
        const { r, g, b } = point.color;
        // Ensure offset is always between 0 and 1
        const rawOffset = i / points.length + Math.sin(time) * 0.1;
        const offset = Math.max(0.001, Math.min(0.999, (rawOffset % 1 + 1) % 1));
        
        // Use different opacity for dark/light mode
        const opacity = isDarkMode ? 0.25 : 0.15;
        gradient.addColorStop(offset, `rgba(${r}, ${g}, ${b}, ${opacity})`);
      });


      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid effect with appropriate color for theme
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)';
      ctx.lineWidth = 0.5;
      
      // Draw simplified grid
      const gridSize = 80;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      const cols = Math.ceil(canvas.width / gridSize) + 1;

      // Horizontal lines with gentle wave
      for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          const baseY = i * gridSize;
          // Add subtle wave
          const distY = baseY + Math.sin(x * 0.005 + time) * 3;
          
          if (x === 0) {
            ctx.moveTo(x, distY);
          } else {
            ctx.lineTo(x, distY);
          }
        }
        ctx.stroke();
      }

      // Vertical lines with gentle wave
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 10) {
          const baseX = i * gridSize;
          // Add subtle wave
          const distX = baseX + Math.sin(y * 0.005 + time) * 3;
          
          if (y === 0) {
            ctx.moveTo(distX, y);
          } else {
            ctx.lineTo(distX, y);
          }
        }
        ctx.stroke();
      }
      
      // Draw light refraction circles
      points.forEach(point => {
        const { r, g, b } = point.color;
        const radius = canvas.width * point.radius * (0.2 + Math.sin(time + point.phase) * 0.05);
        
        // Draw simple gradient circles
        const grd = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius
        );
        
        // Add color stops with appropriate opacity for theme
        const innerOpacity = isDarkMode ? 0.04 : 0.03;
        const outerOpacity = isDarkMode ? 0.015 : 0.01;
        
        grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${innerOpacity})`);
        grd.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, ${outerOpacity})`);
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow effect
        if (Math.random() < 0.01) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${innerOpacity * 2})`;
          ctx.beginPath();
          const glowRadius = radius * 0.2;
          ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, theme]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;