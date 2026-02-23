import React from 'react';

const Card = ({ 
  children, 
  hoverable = true, 
  className = '',
  ...props 
}) => {
  const classes = [
    'bg-white border border-gray-200 rounded-xl overflow-hidden',
    hoverable ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1' : '',
    className,
  ].join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 border-b border-gray-200 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-5 border-t border-gray-200 bg-gray-50 ${className}`}>{children}</div>
);

export default Card;