'use client';

import { useEffect, useRef } from 'react';

interface SpeedometerGaugeProps {
  value: number;        // 0-100 percentage
  size?: number;        // pixel size (default 200)
  label?: string;       // label below gauge
  sublabel?: string;    // secondary info
  color?: string;       // primary color (default from gradient)
  showNeedle?: boolean; // show needle vs arc (default true)
  maxValue?: number;    // max value (default 100)
  thresholds?: {        // color thresholds
    warning: number;
    critical: number;
  };
  animated?: boolean;  // animate on mount (default true)
}

export default function SpeedometerGauge({
  value,
  size = 200,
  label = 'API Usage',
  sublabel,
  color,
  showNeedle = true,
  maxValue = 100,
  thresholds = { warning: 75, critical: 90 },
  animated = true,
}: SpeedometerGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const currentValueRef = useRef<number>(animated ? 0 : value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = (size * 0.7) * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size * 0.55;
    const radius = size * 0.38;

    // Determine color based on value and thresholds
    let primaryColor = color || '#22c55e'; // default green
    if (value >= thresholds.critical) {
      primaryColor = '#ef4444'; // red
    } else if (value >= thresholds.warning) {
      primaryColor = '#f97316'; // orange
    } else if (value >= 50) {
      primaryColor = '#eab308'; // yellow
    }

    const drawGauge = (targetValue: number, animationProgress = 1) => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size * 0.7);

      // Background arc (track)
      const startAngle = Math.PI * 0.8;
      const endAngle = Math.PI * 2.2;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = size * 0.08;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Gradient arc for value
      const valueAngle = startAngle + (endAngle - startAngle) * (animationProgress * targetValue / maxValue);
      
      const gradient = ctx.createLinearGradient(0, centerY, size, centerY);
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(0.5, '#eab308');
      gradient.addColorStop(0.8, '#f97316');
      gradient.addColorStop(1, '#ef4444');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = size * 0.08;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Tick marks
      const tickCount = 10;
      for (let i = 0; i <= tickCount; i++) {
        const tickAngle = startAngle + (endAngle - startAngle) * (i / tickCount);
        const innerRadius = radius - size * 0.06;
        const outerRadius = radius + size * 0.02;
        
        const x1 = centerX + Math.cos(tickAngle) * innerRadius;
        const y1 = centerY + Math.sin(tickAngle) * innerRadius;
        const x2 = centerX + Math.cos(tickAngle) * outerRadius;
        const y2 = centerY + Math.sin(tickAngle) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = i % 2 === 0 ? '#64748b' : '#475569';
        ctx.lineWidth = i % 2 === 0 ? 2 : 1;
        ctx.stroke();
      }

      // Center circle (hub)
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.06, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.03, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();

      if (showNeedle) {
        // Needle
        const needleAngle = startAngle + (endAngle - startAngle) * (animationProgress * targetValue / maxValue);
        const needleLength = radius * 0.75;
        const needleWidth = size * 0.015;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(needleAngle);
        
        ctx.beginPath();
        ctx.moveTo(0, -needleWidth);
        ctx.lineTo(needleLength, 0);
        ctx.lineTo(0, needleWidth);
        ctx.closePath();
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        
        ctx.restore();
      }

      // Value display
      ctx.font = `bold ${size * 0.18}px system-ui, sans-serif`;
      ctx.fillStyle = primaryColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(animationProgress * targetValue)}%`, centerX, centerY + size * 0.15);

      // Label
      ctx.font = `500 ${size * 0.07}px system-ui, sans-serif`;
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(label, centerX, size * 0.65);

      // Sublabel
      if (sublabel) {
        ctx.font = `400 ${size * 0.05}px system-ui, sans-serif`;
        ctx.fillStyle = '#64748b';
        ctx.fillText(sublabel, centerX, size * 0.68);
      }

      // Additional percentage at bottom right (on top of status bar)
      ctx.font = `bold ${size * 0.08}px system-ui, sans-serif`;
      ctx.fillStyle = primaryColor;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${Math.round(animationProgress * targetValue)}%`, size - size * 0.1, size * 0.35);
    };

    if (animated) {
      // Animate from 0 to target value
      const animate = () => {
        const diff = value - currentValueRef.current;
        if (Math.abs(diff) > 0.5) {
          currentValueRef.current += diff * 0.08;
          drawGauge(value, 1);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          currentValueRef.current = value;
          drawGauge(value, 1);
        }
      };
      animate();
    } else {
      drawGauge(value, 1);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, size, label, sublabel, color, showNeedle, maxValue, thresholds, animated]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size * 0.7,
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
}
