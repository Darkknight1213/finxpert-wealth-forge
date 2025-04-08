
import React from 'react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
  onClick?: () => void;
}

const DataCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  valueClassName,
  onClick,
}: DataCardProps) => {
  return (
    <div 
      className={cn(
        "fintech-card", 
        onClick && "cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="fintech-label">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      <div className="flex items-end gap-2">
        <p className={cn("fintech-stats", valueClassName)}>
          {value}
        </p>
        
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-fintech-green' : 'text-fintech-red'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default DataCard;
