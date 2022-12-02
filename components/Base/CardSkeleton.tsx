import React from 'react';

const variants = {
  orange: 'card-loading-orange',
  gray: 'card-loading',
};
type Variants = keyof typeof variants;
type Props = {
  width?: string;
  variant?: Variants;
};
const CardSkeleton = ({ width = 'w-[48%]', variant = 'gray' }: Props) => {
  return (
    <div className={`${variants[variant]} ${width}`}>
      <div className="card-item-loading h-7 w-2/5" />
      <div className="card-item-loading h-5 w-3/4" />
      <div className="card-item-loading h-5 w-4/5" />
      <div className="card-item-loading h-5 w-4/5" />
    </div>
  );
};

export default CardSkeleton;
