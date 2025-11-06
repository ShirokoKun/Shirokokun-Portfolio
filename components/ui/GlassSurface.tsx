'use client';

import { useEffect, useRef, useState, useId } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

interface GlassSurfaceProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: string;
  yChannel?: string;
  mixBlendMode?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GlassSurface = ({
  children,
  width = 'auto',
  height = 'auto',
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 0,
  blueOffset = 0,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}: GlassSurfaceProps) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const redOffsetRef = useRef<SVGFEOffsetElement>(null);
  const greenOffsetRef = useRef<SVGFEOffsetElement>(null);
  const blueOffsetRef = useRef<SVGFEOffsetElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const isDarkMode = useDarkMode();

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', generateDisplacementMap());
    }
  };

  useEffect(() => {
    updateDisplacementMap();
    
    // Update displacement maps
    [
      { ref: redChannelRef },
      { ref: greenChannelRef },
      { ref: blueChannelRef }
    ].forEach(({ ref }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', distortionScale.toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });
    
    // Update color offsets for chromatic aberration
    if (redOffsetRef.current) {
      redOffsetRef.current.setAttribute('dx', (redOffset * 0.1).toString());
      redOffsetRef.current.setAttribute('dy', (redOffset * 0.05).toString());
    }
    
    if (greenOffsetRef.current) {
      greenOffsetRef.current.setAttribute('dx', (greenOffset * 0.1).toString());
      greenOffsetRef.current.setAttribute('dy', (greenOffset * 0.05).toString());
    }
    
    if (blueOffsetRef.current) {
      blueOffsetRef.current.setAttribute('dx', (blueOffset * 0.1).toString());
      blueOffsetRef.current.setAttribute('dy', (blueOffset * 0.05).toString());
    }

    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute('stdDeviation', displace.toString());
    }
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDisplacementMap]);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height, updateDisplacementMap]);

  const supportsSVGFilters = () => {
    if (typeof window === 'undefined') return false;
    
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) {
      return false;
    }

    const div = document.createElement('div');
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== '';
  };

  const supportsBackdropFilter = () => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('backdrop-filter', 'blur(10px)');
  };

  // Use useEffect to apply backdrop filter only on client-side to avoid hydration mismatch
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.backdropFilter = `blur(${blur}px) saturate(${saturation})`;
      (containerRef.current.style as any).webkitBackdropFilter = `blur(${blur}px) saturate(${saturation})`;
    }
  }, [blur, saturation]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        ...style
      }}
    >
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden' }}
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage
              ref={feImageRef}
              result="displacementMap"
              href=""
              preserveAspectRatio="none"
            />
            <feGaussianBlur
              ref={gaussianBlurRef}
              in="displacementMap"
              stdDeviation={displace}
              result="blur"
            />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            <feOffset
              ref={redOffsetRef}
              in="red"
              dx={redOffset * 0.1}
              dy={redOffset * 0.05}
              result="redOffset"
            />
            <feDisplacementMap
              ref={redChannelRef}
              in="redOffset"
              in2="blur"
              scale={distortionScale}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="redChannel"
            />
            
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />
            <feOffset
              ref={greenOffsetRef}
              in="green"
              dx={greenOffset * 0.1}
              dy={greenOffset * 0.05}
              result="greenOffset"
            />
            <feDisplacementMap
              ref={greenChannelRef}
              in="greenOffset"
              in2="blur"
              scale={distortionScale}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="greenChannel"
            />
            
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />
            <feOffset
              ref={blueOffsetRef}
              in="blue"
              dx={blueOffset * 0.1}
              dy={blueOffset * 0.05}
              result="blueOffset"
            />
            <feDisplacementMap
              ref={blueChannelRef}
              in="blueOffset"
              in2="blur"
              scale={distortionScale}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="blueChannel"
            />
            <feBlend
              in="redChannel"
              in2="greenChannel"
              mode="screen"
              result="blend1"
            />
            <feBlend
              in="blend1"
              in2="blueChannel"
              mode="screen"
              result="blend"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `hsla(0, 0%, ${isDarkMode ? 0 : 100}%, ${backgroundOpacity})`,
          filter: !supportsBackdropFilter() && supportsSVGFilters() ? `url(#${filterId})` : undefined,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export { GlassSurface };