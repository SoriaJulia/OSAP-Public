const CardSkeleton = ({ width = 'w[300px]' }: { width?: string }) => {
  return (
    <div className={`${width} card-loading h-[300px] items-center justify-between from-gray-300 to-gray-400`}>
      <div className="flex w-full justify-end gap-3">
        <div className="h-11 w-11 animate-pulse rounded-full bg-gradient-to-tr from-slate-200 to-slate-300" />
      </div>
      <div className="h-9 w-4/5 animate-pulse rounded bg-gradient-to-tr from-slate-200 to-slate-300" />
    </div>
  );
};

export default CardSkeleton;
