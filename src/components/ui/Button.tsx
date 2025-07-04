import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-secondary-500 hover:bg-primary-600 focus:ring-2 focus:ring-primary-300',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-2 focus:ring-secondary-300',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-2 focus:ring-primary-300',
    text: 'bg-transparent text-primary-500 hover:text-primary-600 hover:underline',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;