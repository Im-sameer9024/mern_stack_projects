import { Checkbox } from "../../ui/checkbox";

const FilterContent = ({
  getValues,
  handleCategoryChange,
  handleTypeChange,
  clearFilters
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">FILTERS</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="border border-gray-200 p-4 rounded-lg flex flex-col gap-4">
        <h3 className="font-semibold">CATEGORIES</h3>
        {["Men", "Women", "Kids"].map((category) => (
          <label key={category} className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={getValues("category").includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Type Filter */}
      <div className="border border-gray-200 p-4 rounded-lg flex flex-col gap-4">
        <h3 className="font-semibold">TYPE</h3>
        {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
          <label key={type} className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={getValues("type").includes(type)}
              onCheckedChange={() => handleTypeChange(type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterContent;