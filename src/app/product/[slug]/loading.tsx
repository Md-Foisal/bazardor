export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="skeleton h-4 w-48" />
      <div className="flex items-center gap-5 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton size-20 rounded-2xl" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="skeleton h-8 w-56" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="skeleton hidden h-28 w-32 rounded-2xl md:block" />
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton h-6 w-40" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="skeleton h-24" />
          <div className="skeleton h-24" />
          <div className="skeleton h-24" />
        </div>
        <div className="skeleton h-72 w-full" />
      </div>
    </div>
  );
}
