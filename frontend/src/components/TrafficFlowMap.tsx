import React from 'react';

export const TrafficFlowMap: React.FC<{ queueLengthMeters: number }> = ({ queueLengthMeters }) => {
  return (
    <div style={{ padding: 12, border: '1px solid #333333', backgroundColor: '#0a0a0a' }}>
      <p style={{ color: '#00ffff', margin: 0 }}>Queue Length: {queueLengthMeters}m</p>
    </div>
  );
};
