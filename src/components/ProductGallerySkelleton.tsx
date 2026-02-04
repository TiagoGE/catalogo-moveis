export default function ProductGallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
        />
      ))}
    </div>
  )
}
