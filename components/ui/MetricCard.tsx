import React from 'react';
import {
  DivideIcon as LucideDivide, // example fallback
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;        // ✅ `LucideIcon` is imported *as a type*
  subtitle?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon = LucideDivide, // fallback icon
  subtitle,
  className = '',
}) => {
  const formatChange = (n: number) =>
    `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const TrendIcon =
    changeType === 'positive'
      ? TrendingUp
      : changeType === 'negative'
      ? TrendingDown
      : null;

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>

          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold font-montserrat text-navy-dark">
              {value}
            </p>

            {change !== undefined && (
              <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
                {TrendIcon && <TrendIcon className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {formatChange(change)}
                </span>
              </div>
            )}
          </div>

          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className="flex-shrink-0 p-3 bg-gold/10 rounded-full">
            <Icon className="w-6 h-6 text-gold" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
