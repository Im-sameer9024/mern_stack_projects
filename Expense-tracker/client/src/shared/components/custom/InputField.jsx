import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Controller } from 'react-hook-form';

const InputField = ({
  type = 'text',
  label,
  name,
  error,
  loading,
  control, // ✅ use control instead of register
  placeholder,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="relative">
            <Input
              {...field} // ✅ important
              disabled={loading}
              {...props}
              placeholder={placeholder}
              type={isPassword && showPassword ? 'text' : type}
              className={`bg-blue-50 outline-none focus:ring-blue-100! text-black/70 font-content placeholder:text-black/30 border-none ${className}`}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        )}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
