import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}) => {
  const baseStyles = 'animate-pulse bg-secondary/20 rounded';
  
  const variants = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const getStyle = () => {
    const style = {};
    if (width) style.width = width;
    if (height) style.height = height;
    return style;
  };

  const classes = [
    baseStyles,
    variants[variant],
    className,
  ].join(' ');

  const renderSkeleton = () => (
    <div 
      className={classes}
      style={getStyle()}
      role="status"
      aria-label="Loading..."
    />
  );

  return count === 1 ? renderSkeleton() : (
    <div className="space-y-2">
      {[...Array(count)].map((_, index) => (
        <div key={index} className={classes} style={getStyle()} />
      ))}
    </div>
  );
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  count: PropTypes.number,
};

export default Skeleton; 