// src/shared/components/common/InputField.jsx

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";

const InputField = ({
  type = "text",
  label,
  name,
  error,
  loading,
  register,
  placeholder,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        <Input
          id={name}
          disabled={loading}
          placeholder={placeholder}
          type={isPassword && showPassword ? "text" : type}
          {...(register && register(name))}
          className={` bg-blue-50 outline-none focus:ring-blue-100! text-black/70 font-content placeholder:text-black/30 border-none  ${className}`}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error */}
      {error && <p className=" text-xs font-light text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
