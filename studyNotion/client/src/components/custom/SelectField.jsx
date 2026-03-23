import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

const SelectField = ({
  label,
  value,
  onChange,
  placeholder,
  loading = false,
  disabled = false,
  options = [],
  error,
}) => {
  const isDisabled = loading || disabled;

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label className="text-sm text-richBlack-100">{label}</Label>

      <Select onValueChange={onChange} value={value} disabled={isDisabled}>
        <SelectTrigger className="w-full bg-richBlack-700 border border-richBlack-600">
          <SelectValue placeholder={loading ? 'Loading...' : placeholder} />
        </SelectTrigger>

        <SelectContent>
          {loading && (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          )}

          {!loading && options.length === 0 && (
            <SelectItem value="empty" disabled>
              No options available
            </SelectItem>
          )}

          {!loading &&
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  );
};

export default SelectField;
