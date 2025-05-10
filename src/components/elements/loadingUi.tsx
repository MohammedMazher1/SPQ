import React from 'react';
import Image from 'next/image';

const LoadingUi = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src={'/image/loader.gif'}
        height={90}
        width={90}
        alt="loading"
        unoptimized
      />
    </div>
  );
};

export default LoadingUi;
