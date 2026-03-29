const CategoryHero = ({ name, description, courseCount = 0, topSellerCount = 0 }) => (
  <div className="border-b border-richBlack-700 bg-richBlack-800/60">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs text-richBlack-400 uppercase tracking-widest font-medium">Category</p>

        <h1 className="text-4xl font-bold text-white leading-tight">{name ?? 'All Courses'}</h1>

        {description && (
          <p className="text-richBlack-300 text-base leading-relaxed">{description}</p>
        )}

        <div className="flex items-center gap-6 pt-2">
          <span className="text-sm text-richBlack-400">
            <span className="text-yellow-400 font-semibold">{courseCount}</span> courses available
          </span>
          <span className="text-sm text-richBlack-400">
            <span className="text-yellow-400 font-semibold">{topSellerCount}</span> top sellers
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryHero;
