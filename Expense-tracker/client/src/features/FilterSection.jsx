import CustomSelectField from '@/shared/components/custom/CustomSelectField';
import { Input } from '@/shared/components/ui/input';
import CustomButton from '@/shared/components/custom/CustomButton';

const FilterSection = ({ filterChangeHandler, filters, onReset }) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 🔥 Filters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Per Page */}
        <CustomSelectField
          label="Per Page"
          value={filters?.limit}
          onChange={(val) => filterChangeHandler('limit', val)}
          options={[
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '25', value: 25 },
          ]}
        />

        {/* Sort */}
        <CustomSelectField
          label="Sort By"
          value={filters?.sort}
          onChange={(val) => filterChangeHandler('sort', val)}
          options={[
            { label: 'Latest', value: 'latest' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'Highest', value: 'highest' },
            { label: 'Lowest', value: 'lowest' },
          ]}
        />

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <Input
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={filters?.startDate || ''}
            onChange={(e) => filterChangeHandler('startDate', e.target.value)}
            className="bg-blue-50 border-none text-black/70"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <Input
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={filters?.endDate || ''}
            onChange={(e) => filterChangeHandler('endDate', e.target.value)}
            className="bg-blue-50 border-none text-black/70"
          />
        </div>
      </div>

      {/* 🔥 Actions */}
      <div className="flex justify-end">
        <CustomButton variant="outline" onClick={onReset}>
          Reset Filters
        </CustomButton>
      </div>
    </div>
  );
};

export default FilterSection;
