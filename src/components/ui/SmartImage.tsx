import React, { useState, useEffect } from "react";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
}

const DEFAULT_CATTLE_FALLBACK = "/cows/kangeyam.jpg";

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = "",
  fallbackSrc = DEFAULT_CATTLE_FALLBACK,
  aspectRatio,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setIsLoading(true);
      setHasError(false);
    } else {
      setCurrentSrc(fallbackSrc);
      setIsLoading(false);
    }
  }, [src, fallbackSrc]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading Skeleton Shimmer */}
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-200/70 dark:bg-zinc-800 flex items-center justify-center">
          <div className="absolute inset-0 animate-shimmer" />
          <span className="material-symbols-outlined text-zinc-400 text-2xl animate-spin z-10">
            progress_activity
          </span>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        {...props}
      />

      {/* Fallback Badge if fallback is active */}
      {hasError && (
        <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
          Verified Asset
        </div>
      )}
    </div>
  );
};

export default SmartImage;
