import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ label, name, type = 'text', placeholder, register, error, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={name} className="text-sm text-richBlack-100">
        {label}
      </Label>

      <div className="relative">
        <Input
          id={name}
          disabled={loading}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          {...(register && register(name))}
          className="bg-richBlack-700 border border-richBlack-600   pr-10"
        />

        {/* Eye Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer text-richBlack-300 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  );
};

export default InputField;
