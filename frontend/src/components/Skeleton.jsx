export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-mist ${className}`} />
}

export function GridSkeleton({ count = 3, className = 'aspect-[4/3]' }) {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <Skeleton className={className} />
          <Skeleton className="mt-6 h-4 w-1/3" />
          <Skeleton className="mt-3 h-7 w-4/5" />
        </div>
      ))}
    </div>
  )
}
