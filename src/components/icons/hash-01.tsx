import React from 'react';

type propTypes = {
  size?: number;
  stroke?: string;
  fill?: string;
};

const Hash01 = ({
  size = 24,
  stroke = '#667085',
  fill = 'none',
}: propTypes) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 8H20M4 16H20M8 3V21M16 3V21"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Hash01;
