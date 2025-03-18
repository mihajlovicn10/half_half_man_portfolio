import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({
  children,
  variant = 'default',
  size = 'medium',
  removable = false,
  onRemove,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center rounded-full font-medium';

  const variants = {
    default: 'bg-secondary/10 text-secondary',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base',
  };

  const classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    className,
  ].join(' ');

  return (
    <span className={classes}>
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 hover:bg-black/5 rounded-full p-0.5 transition-colors"
          aria-label="Remove tag"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};

export default Tag; 