import { useState } from 'react';
import { Label } from '../ui/label';
import { X } from 'lucide-react';
import { Input } from '../ui/input';

const ChipInputField = ({ label, value = [], onChange, placeholder, max = 5, error }) => {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (!inputValue.trim()) return;

    if (value.includes(inputValue.trim())) return;

    if (value.length >= max) return;

    onChange([...value, inputValue.trim()]);
    setInputValue('');
  };

  const removeItem = (item) => {
    onChange(value.filter((i) => i !== item));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm text-richBlack-100">{label}</Label>

      {/* Selected chips */}
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded text-xs"
          >
            {item}
            <button type="button" onClick={() => removeItem(item)} className="hover:cursor-pointer">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <Input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addItem();
          }
        }}
        className="bg-richBlack-700 border border-richBlack-600 rounded px-3 py-2 text-sm"
      />

      <p className="text-xs text-richBlack-400">
        Press Enter to add ({value.length}/{max})
      </p>

      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  );
};

export default ChipInputField;
