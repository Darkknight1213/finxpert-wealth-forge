
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  valueClassName?: string;
  label?: string;
  showPercentage?: boolean;
}

const ProgressCircle = ({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  className,
  valueClassName,
  label,
  showPercentage = true,
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = max === 0 ? 0 : (value / max) * 100;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("text-primary transition-all duration-500 ease-out", valueClassName)}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={cn("text-xl font-bold", valueClassName)}>
          {showPercentage ? `${Math.round(progress)}%` : value}
        </span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
};

export default ProgressCircle;
