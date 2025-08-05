import React from 'react';

const CustomBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center">No data available</p>;
  }

  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.dailyInstalled));

  return (
    <div className="w-full">
      <svg width="100%" height="200" role="img" aria-label="Daily WTG Installation Progress Bar Chart" viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* X-axis line */}
        <line x1="40" y1="180" x2="390" y2="180" stroke="#666" strokeWidth="1" />
        {/* Bars */}
        {data.map((item, index) => {
          const barWidth = 40;
          const gap = 20;
          const x = 40 + index * (barWidth + gap);
          const barHeight = (item.dailyInstalled / maxValue) * 150;
          const y = 180 - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#8884d8"
                rx="4"
                ry="4"
              />
              <text
                x={x + barWidth / 2}
                y={195}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {item.label}
              </text>
            </g>
          );
        })}
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((fraction, idx) => {
          const y = 180 - fraction * 150;
          const value = Math.round(fraction * maxValue * 100) / 100;
          return (
            <g key={idx}>
              <line x1="35" y1={y} x2="40" y2={y} stroke="#666" strokeWidth="1" />
              <text x="30" y={y + 4} textAnchor="end" fontSize="10" fill="#666">
                {value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CustomBarChart;
