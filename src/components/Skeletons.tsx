export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex items-start gap-3">
        <div className="skeleton size-12 shrink-0 rounded-xl" />
        <div className="flex flex-1 flex-col gap-2 pt-1">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-6 w-14 rounded-xl" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
