'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DataPoint {
  date: string;
  fund: number;
  benchmark: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
  height?: number;
  showArea?: boolean;
  className?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  height = 300, 
  showArea = false,
  className = ""
}) => {
  const Chart = showArea ? AreaChart : LineChart;

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <Chart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)}%`,
              name === 'fund' ? 'Meridian Fund' : 'S&P 500'
            ]}
            labelStyle={{ color: '#334155' }}
          />
          
          {showArea ? (
            <>
              <defs>
                <linearGradient id="fundGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E0A106" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E0A106" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B263B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1B263B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="fund"
                stroke="#E0A106"
                strokeWidth={3}
                fill="url(#fundGradient)"
                dot={{ fill: '#E0A106', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#E0A106', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#1B263B"
                strokeWidth={2}
                fill="url(#benchmarkGradient)"
                dot={{ fill: '#1B263B', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#1B263B', strokeWidth: 2 }}
              />
            </>
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="fund"
                stroke="#E0A106"
                strokeWidth={3}
                dot={{ fill: '#E0A106', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#E0A106', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#1B263B"
                strokeWidth={2}
                dot={{ fill: '#1B263B', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#1B263B', strokeWidth: 2 }}
              />
            </>
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;