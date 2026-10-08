export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-2">
        <div className="skeleton h-7 w-40" />
        <div className="skeleton h-4 w-56" />
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <div className="skeleton size-20 rounded-[10.5px]" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <div className="skeleton h-48 w-full rounded-2xl" />
    </div>
  );
}
