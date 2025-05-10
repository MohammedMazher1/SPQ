import React from 'react';

type propTypes = {
  size?: number;
  stroke?: string;
  fill?: string;
};

const YE = ({ size = 16, fill = 'none' }: propTypes) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_19966_9577)">
      <path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill="#F0F0F0"
      />
      <path
        d="M8.00045 15.9996C11.4402 15.9996 14.3725 13.8286 15.5029 10.7822H0.498047C1.62839 13.8286 4.56073 15.9996 8.00045 15.9996Z"
        fill="black"
      />
      <path
        d="M8.00045 0.000488281C4.56073 0.000488281 1.62839 2.17149 0.498047 5.21789H15.5029C14.3725 2.17149 11.4402 0.000488281 8.00045 0.000488281Z"
        fill="#D80027"
      />
    </g>
    <defs>
      <clipPath id="clip0_19966_9577">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default YE;
