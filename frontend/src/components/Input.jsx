import React from 'react';

const Input = ({
  label,
  type = 'text',
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full px-4 py-2.5 border rounded-lg bg-white
                     focus:outline-none focus:ring-2 focus:ring-[#C47A4A] focus:border-transparent
                     transition-all duration-200
                     ${icon ? 'pl-10' : ''} 
                     ${error ? 'border-red-500' : 'border-gray-300'}
                     ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;