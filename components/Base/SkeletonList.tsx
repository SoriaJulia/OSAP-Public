import { cloneElement, ReactElement } from 'react';

const SkeletonList = ({
  length,
  component: SkeletonComponent,
  show,
}: {
  length: number;
  component: ReactElement<{ width?: string }>;
  show: boolean;
}) => {
  if (!show) {
    return null;
  }
  return (
    <>
      {Array.from(Array(length).keys()).map((val) => {
        return cloneElement(SkeletonComponent, { key: val });
      })}
    </>
  );
};

export default SkeletonList;
