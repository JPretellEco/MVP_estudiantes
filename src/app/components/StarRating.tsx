import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumber?: boolean;
}

export function StarRating({ rating, maxRating = 5, size = 20, showNumber = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const fillPercentage = Math.max(0, Math.min(1, rating - i));
        
        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            {/* Empty star */}
            <Star
              className="absolute inset-0 text-gray-300"
              style={{ width: size, height: size }}
              fill="currentColor"
            />
            {/* Filled star */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star
                className="text-yellow-400"
                style={{ width: size, height: size }}
                fill="currentColor"
              />
            </div>
          </div>
        );
      })}
      {showNumber && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
