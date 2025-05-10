import React from 'react';

type Props = {
  title: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
  className?: string;
};
const VeiwCard = ({ title, description, icon, className }: Props) => {
  return (
    <div className="space-y-1">
      <h1>{title}</h1>
      <div className={`flex gap-2 rounded-sm bg-[#EFF1F999] p-2 ${className}`}>
        <div className="size-[24px] text-gray-500">{icon}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default VeiwCard;
