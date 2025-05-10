import React from 'react';

type propTypes = {
  size?: number;
  stroke?: string;
  fill?: string;
};

const MarkerPin05 = ({
  size = 12,
  stroke = '#B42318',
  fill = 'none',
}: propTypes) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_18911_1843)">
      <path
        d="M8 6.68722C9.7659 7.03442 11 7.82736 11 8.75C11 9.99264 8.76142 11 6 11C3.23858 11 1 9.99264 1 8.75C1 7.82736 2.2341 7.03442 4 6.68722M6 8.5V1.5L8.65886 3.13622C8.8528 3.25557 8.94977 3.31525 8.98071 3.39043C9.00769 3.456 9.00556 3.52995 8.97484 3.59386C8.93962 3.66713 8.83937 3.72111 8.63886 3.82907L6 5.25"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_18911_1843">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default MarkerPin05;
