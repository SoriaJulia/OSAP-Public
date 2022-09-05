import React from 'react';

type Props = {
  width?: string;
  styles?: string;
};
const CardSkeleton = ({ width = 'w-[48%]', styles }: Props) => {
  return (
    <div className={`${styles} ${width} card-loading`}>
      <div className="card-item-loading h-7 w-2/5" />
      <div className="card-item-loading h-5 w-3/4" />
      <div className="card-item-loading h-5 w-4/5" />
      <div className="card-item-loading h-5 w-4/5" />
    </div>
  );
};

export default CardSkeleton;
