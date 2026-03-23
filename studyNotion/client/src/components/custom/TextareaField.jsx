import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const TextareaField = ({ label, name, placeholder, register, error, loading, rows = 4 }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      <Label htmlFor={name} className="text-sm text-richBlack-100">
        {label}
      </Label>

      {/* Textarea */}
      <Textarea
        id={name}
        rows={rows}
        disabled={loading}
        placeholder={placeholder}
        {...(register && register(name))}
        className="bg-richBlack-700 border h-30 border-richBlack-600 resize-none"
      />

      {/* Error */}
      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  );
};

export default TextareaField;
