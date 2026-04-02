// src/shared/components/common/SelectField.tsx

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const CustomSelectField = ({
  label,
  options = [],
//   name,
  error,
  loading,
  placeholder = 'Select an option',
  className = '',
  value,
  onChange,
  //   register, // optional (react-hook-form alternative)
}) => {

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      {/* Select */}
      <Select
        disabled={loading}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger
          className={`bg-blue-50 outline-none focus:ring-blue-100! text-black/70 font-content border-none ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Error */}
      {error && <p className="text-xs font-light text-red-500">{error.message}</p>}
    </div>
  );
};

export default CustomSelectField;
