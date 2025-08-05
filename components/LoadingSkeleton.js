import React from 'react';

const LoadingSkeleton = ({ 
  className = '', 
  variant = 'default',
  count = 1,
  height = 'h-4',
  width = 'w-full',
  rounded = 'rounded-md'
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`skeleton loading-shimmer ${height} ${width} ${rounded} ${className}`}
    />
  ));

  if (count === 1) {
    return skeletons[0];
  }

  return <div className="space-y-2">{skeletons}</div>;
};

// Specific skeleton components for different UI elements
export const CardSkeleton = ({ className = '' }) => (
  <div className={`card p-6 ${className}`}>
    <div className="space-y-4">
      <LoadingSkeleton height="h-6" width="w-1/3" />
      <LoadingSkeleton height="h-4" width="w-2/3" />
      <div className="space-y-2">
        <LoadingSkeleton height="h-3" />
        <LoadingSkeleton height="h-3" width="w-5/6" />
        <LoadingSkeleton height="h-3" width="w-4/5" />
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 6, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {/* Table header skeleton */}
    <div className="flex space-x-4 p-4 border-b">
      {Array.from({ length: columns }, (_, index) => (
        <LoadingSkeleton 
          key={`header-${index}`} 
          height="h-4" 
          width="w-20" 
          className="flex-1"
        />
      ))}
    </div>
    
    {/* Table rows skeleton */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex space-x-4 p-4">
        {Array.from({ length: columns }, (_, colIndex) => (
          <LoadingSkeleton 
            key={`cell-${rowIndex}-${colIndex}`} 
            height="h-4" 
            width="w-16" 
            className="flex-1"
          />
        ))}
      </div>
    ))}
  </div>
);

export const ChartSkeleton = ({ type = 'bar', className = '' }) => {
  if (type === 'bar') {
    return (
      <div className={`space-y-4 ${className}`}>
        <LoadingSkeleton height="h-6" width="w-1/3" />
        <div className="flex items-end space-x-2 h-48">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <LoadingSkeleton 
                height={`h-${Math.floor(Math.random() * 32) + 16}`} 
                width="w-full" 
                rounded="rounded-t-md"
              />
              <LoadingSkeleton height="h-3" width="w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    return (
      <div className={`space-y-4 ${className}`}>
        <LoadingSkeleton height="h-6" width="w-1/3" />
        <div className="flex items-center justify-center">
          <LoadingSkeleton 
            height="h-48" 
            width="w-48" 
            rounded="rounded-full" 
          />
        </div>
        <div className="flex justify-center space-x-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <LoadingSkeleton height="h-3" width="w-3" rounded="rounded-full" />
              <LoadingSkeleton height="h-3" width="w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <LoadingSkeleton height="h-6" width="w-1/3" />
      <LoadingSkeleton height="h-48" />
    </div>
  );
};

export const NavigationSkeleton = ({ items = 4, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: items }, (_, index) => (
      <div key={index} className="flex items-center space-x-3 p-3">
        <LoadingSkeleton height="h-4" width="w-4" rounded="rounded-full" />
        <LoadingSkeleton height="h-4" width="w-24" />
      </div>
    ))}
  </div>
);

export const HeaderSkeleton = ({ className = '' }) => (
  <div className={`flex items-center justify-between p-4 border-b ${className}`}>
    <div className="space-y-2">
      <LoadingSkeleton height="h-6" width="w-48" />
      <LoadingSkeleton height="h-4" width="w-32" />
    </div>
    <div className="flex items-center space-x-3">
      <LoadingSkeleton height="h-8" width="w-8" rounded="rounded-full" />
      <div className="space-y-1">
        <LoadingSkeleton height="h-4" width="w-24" />
        <LoadingSkeleton height="h-3" width="w-32" />
      </div>
    </div>
  </div>
);

export const ButtonSkeleton = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-16',
    md: 'h-10 w-20',
    lg: 'h-11 w-24',
  };

  return (
    <LoadingSkeleton 
      height={sizeClasses[size]} 
      className={className}
      rounded="rounded-md"
    />
  );
};

export const BadgeSkeleton = ({ className = '' }) => (
  <LoadingSkeleton 
    height="h-5" 
    width="w-16" 
    rounded="rounded-full" 
    className={className}
  />
);

export const AvatarSkeleton = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <LoadingSkeleton 
      height={sizeClasses[size]} 
      rounded="rounded-full" 
      className={className}
    />
  );
};

// Pulse animation variant
export const PulseSkeleton = ({ children, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    {children}
  </div>
);

// Shimmer animation variant
export const ShimmerSkeleton = ({ children, className = '' }) => (
  <div className={`loading-shimmer ${className}`}>
    {children}
  </div>
);

export default LoadingSkeleton;
