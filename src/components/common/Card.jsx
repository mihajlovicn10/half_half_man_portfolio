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

  const isInteractive = Boolean(onClick) || hover;
  const hoverStyles = isInteractive ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : '';
  const focusStyles = isInteractive ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80' : '';

  const classes = [
    baseStyles,
    variants[variant],
    paddings[padding],
    hoverStyles,
    focusStyles,
    className,
  ].join(' ');

  const handleKeyDown = (e) => {
    if (!onClick) return;
    // Make non-button card activate on Enter/Space like a real button
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div 
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
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