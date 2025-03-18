import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  onClick,
  hover = false,
}) => {
  const baseStyles = 'rounded-lg shadow-md transition-all duration-200';
  
  const variants = {
    default: 'bg-white border border-secondary/20',
    primary: 'bg-primary/5 border border-primary/20',
    secondary: 'bg-secondary/5 border border-secondary/20',
  };

  const paddings = {
    none: '',
    small: 'p-3',
    medium: 'p-5',
    large: 'p-7',
  };

  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : '';

  const classes = [
    baseStyles,
    variants[variant],
    paddings[padding],
    hoverStyles,
    className,
  ].join(' ');

  return (
    <div 
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  hover: PropTypes.bool,
};

export default Card; 