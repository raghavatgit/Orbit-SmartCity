import React from 'react';

export const CongestionIndexChart: React.FC<{ data: number[] }> = ({ data }) => {
  return (
    <svg width="200" height="60" style={{ backgroundColor: '#000000' }}>
      <polyline
        fill="none"
        stroke="#00ffff"
        strokeWidth="2"
        points={data.map((val, idx) => `${idx * 10},${60 - val}`).join(' ')}
      />
    </svg>
  );
};
