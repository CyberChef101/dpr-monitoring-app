import React from 'react';

const CustomPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center">No data available</p>;
  }

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate cumulative percentages for arcs
  let cumulativePercent = 0;

  // Function to convert percentage to SVG arc path
  const getArcPath = (percent, radius = 80, centerX = 100, centerY = 100) => {
    const startAngle = 2 * Math.PI * cumulativePercent;
    cumulativePercent += percent / total;
    const endAngle = 2 * Math.PI * cumulativePercent;

    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  // Reset cumulativePercent for rendering
  cumulativePercent = 0;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="200" role="img" aria-label="Crane Utilization Pie Chart">
        {data.map((slice, index) => {
          const path = getArcPath(slice.value);
          return (
            <path
              key={index}
              d={path}
              fill={slice.color}
              stroke="#fff"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="flex justify-center gap-6 mt-4">
        {data.map((slice, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: slice.color }}
              aria-hidden="true"
            />
            <span>{slice.name}: {slice.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
