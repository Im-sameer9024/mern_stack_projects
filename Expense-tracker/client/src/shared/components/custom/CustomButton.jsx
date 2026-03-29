// src/shared/components/common/CustomButton.jsx

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Loader2 } from 'lucide-react';

const CustomButton = ({
  children,
  active,
  variant = 'default',
  size = 'default',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading || props.disabled}
      className={` hover:cursor-pointer  hover:scale-95 transition-all duration-300 ${fullWidth ? 'w-full' : ''} ${active ? 'bg-blue-600 hover:bg-blue-700' : ' bg-slate-300 text-black hover:bg-slate-400 '} ${className}`}
      {...props}
    >
      {/* Loading */}
      {loading && <Loader2 className="animate-spin mr-1" size={16} />}

      {/* Left Icon */}
      {!loading && leftIcon && <span className="mr-1 flex items-center">{leftIcon}</span>}

      {/* Text */}
      {children}

      {/* Right Icon */}
      {!loading && rightIcon && <span className="ml-1 flex items-center">{rightIcon}</span>}
    </Button>
  );
};

export default CustomButton;
