import { Loader2 } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

type Prop = {
  type: 'button' | 'reset' | 'submit';
  className: string;
  isLoading: boolean;
  children?: ReactNode;
};

const LoaderBtn = ({ type, className, isLoading, children }: Prop) => {
  return (
    <Button className={className} type={type} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="animate-spin" color="#fff" size={20} />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoaderBtn;
