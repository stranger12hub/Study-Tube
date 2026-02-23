import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  icon,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary/50',
    secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
    outline: 'bg-transparent border-2 border-[#2a2a2a] text-secondary hover:bg-[#1a1a1a] hover:text-white hover:border-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = [
    'btn relative inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d0d0d]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'hover:scale-105 active:scale-95',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;