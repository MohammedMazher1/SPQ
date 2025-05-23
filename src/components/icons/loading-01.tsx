import React from 'react';

type propTypes = {
  size?: number;
  stroke?: string;
  fill?: string;
};

const Loading01 = ({
  size = 22,
  stroke = '#667085',
  fill = 'none',
}: propTypes) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1.25V3.75M11 17V21M4.75 11H1.25M20.25 11H18.75M17.4571 17.4571L16.75 16.75M17.6642 4.41579L16.25 5.83M3.92157 18.0784L6.75 15.25M4.12868 4.20868L6.25 6.33"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Loading01;
