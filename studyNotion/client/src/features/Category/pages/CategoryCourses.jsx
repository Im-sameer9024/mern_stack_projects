// features/category/pages/CategoryCourses.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useGetCategoryDetails } from '../hooks/useCategory';
import CategoryHero from '../components/Categoryhero';
import HorizontalScrollSection from '../components/Horizontalscrollsection';

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data: CategoryCoursesData, isPending, error } = useGetCategoryDetails(categoryId);

  // ── Parse API response ────────────────────────────────────────────────────

  const payload = CategoryCoursesData?.data ?? {};
  const selectedCategory = payload.selectedCategory ?? null;
  const selectedCourses = selectedCategory?.courses ?? [];
  const topSellingCourses = payload.topSellingCourses ?? [];
  const differentCategories = payload.differentCategories ?? [];

  const hasAnyCourse =
    selectedCourses.length > 0 || topSellingCourses.length > 0 || differentCategories.length > 0;

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-richBlack-900 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-red-400 text-lg font-medium">Failed to load category</p>
          <p className="text-richBlack-400 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richBlack-900 text-white">
      {/*------------------ Hero-------------------------- */}
      {isPending ? (
        // Hero skeleton
        <div className="border-b border-richBlack-700 bg-richBlack-800/60">
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-3 animate-pulse">
            <div className="h-3 bg-richBlack-700 rounded w-16" />
            <div className="h-8 bg-richBlack-700 rounded w-56" />
            <div className="h-4 bg-richBlack-700 rounded w-96" />
            <div className="flex gap-6 pt-2">
              <div className="h-3 bg-richBlack-700 rounded w-28" />
              <div className="h-3 bg-richBlack-700 rounded w-24" />
            </div>
          </div>
        </div>
      ) : (
        <CategoryHero
          name={selectedCategory?.name}
          description={selectedCategory?.description}
          courseCount={selectedCourses.length}
          topSellerCount={topSellingCourses.length}
        />
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {/*------------------- Selected category courses----------------------- */}
        <HorizontalScrollSection
          title={`Courses in ${selectedCategory?.name ?? 'this category'}`}
          subtitle={`${selectedCourses.length} courses to explore`}
          courses={selectedCourses}
          isLoading={isPending}
        />

        {/* --------------------- Top selling ------------------------- */}
        <HorizontalScrollSection
          title="Top Selling"
          subtitle="Most popular courses across all categories"
          courses={topSellingCourses}
          isLoading={isPending}
        />

        {/* ---------------- Recommended & different category ----------------- */}
        {(isPending || differentCategories.length > 0) && (
          <section className="space-y-8">
            {/* Recommended heading */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-yellow-400 uppercase tracking-widest font-semibold mb-1">
                  Recommended for you
                </p>
                <h2 className="text-xl font-bold text-white">Explore Other Categories</h2>
              </div>
              <div className="flex-1 h-px bg-richBlack-700" />
            </div>

            {isPending ? (
              // Show two placeholder rows while loading
              <div className="space-y-10">
                <HorizontalScrollSection title="" courses={[]} isLoading={true} />
                <HorizontalScrollSection title="" courses={[]} isLoading={true} />
              </div>
            ) : (
              <div className="space-y-10">
                {differentCategories.map((cat) => {
                  const catName = cat?.name ?? 'More Courses';
                  const catCourses = cat?.courses ?? (Array.isArray(cat) ? cat : [cat]);

                  return (
                    <HorizontalScrollSection
                      key={cat?._id ?? catName}
                      title={catName}
                      courses={catCourses}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/*---------------------- Empty state --------------------- */}
        {!isPending && !hasAnyCourse && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <BookOpen size={48} className="text-richBlack-600" />
            <p className="text-richBlack-400 text-lg">No courses in this category yet</p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-lg bg-yellow-400 text-black text-sm
                         font-medium hover:bg-yellow-300 transition-colors"
            >
              Browse all categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCourses;
