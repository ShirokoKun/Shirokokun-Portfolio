export default function PostSkeleton() {
  return (
    <article className="glass-card p-6 relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Image skeleton */}
      <div className="w-full h-48 bg-white/5 rounded-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '0.2s' }} />
      </div>
      
      {/* Title skeleton */}
      <div className="h-6 bg-white/5 rounded-lg mb-3 w-3/4 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '0.4s' }} />
      </div>
      
      {/* Date/Author skeleton */}
      <div className="h-4 bg-white/5 rounded-lg mb-3 w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '0.6s' }} />
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-white/5 rounded-lg w-full relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '0.8s' }} />
        </div>
        <div className="h-4 bg-white/5 rounded-lg w-5/6 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '1s' }} />
        </div>
        <div className="h-4 bg-white/5 rounded-lg w-4/6 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '1.2s' }} />
        </div>
      </div>
      
      {/* Button skeleton */}
      <div className="h-10 bg-white/5 rounded-lg w-32 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '1.4s' }} />
      </div>
    </article>
  );
}

