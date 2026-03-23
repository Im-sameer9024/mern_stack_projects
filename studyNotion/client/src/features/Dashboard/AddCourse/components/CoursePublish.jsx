// CoursePublish.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from 'lucide-react';
import { setStep } from '../courseSlice';

const CoursePublish = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.course);
  const [isPublic, setIsPublic] = useState(false);

  const handleBack = () => dispatch(setStep(2));

  const handleSaveAsDraft = () => {
    // 🔁 Replace with your draft API call
    console.log('Save as Draft', { isPublic });
  };

  const handleSaveAndPublish = () => {
    // 🔁 Replace with your publish API call
    console.log('Save and Publish', { isPublic });
  };

  return (
    <div className="space-y-6">
      {/* ── Publish Settings Card ── */}
      <div className="bg-richBlack-800 border border-richBlack-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Publish Settings</h2>

        {/* Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer group w-fit">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="sr-only peer"
            />
            {/* custom checkbox box */}
            <div
              className="w-5 h-5 rounded-sm border-2 border-richBlack-400
                            peer-checked:border-yellow-400 peer-checked:bg-yellow-400
                            group-hover:border-richBlack-300 transition-all duration-200
                            flex items-center justify-center shrink-0"
            >
              {isPublic && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path
                    d="M1 4L4 7.5L10 1"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="text-richBlack-200 text-sm group-hover:text-white transition-colors">
            Make this Course Public
          </span>
        </label>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="flex items-center justify-between pt-2">
        {/* Back */}
        <button
          type="button"
          onClick={handleBack}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium
                     bg-richBlack-700 border border-richBlack-600 text-white
                     hover:bg-richBlack-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveAsDraft}
            disabled={isLoading}
            className="px-6 py-3 rounded-md text-sm font-medium
                       bg-richBlack-700 border border-richBlack-600 text-white
                       hover:bg-richBlack-600 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            Save as a Draft
          </button>

          <button
            type="button"
            onClick={handleSaveAndPublish}
            disabled={isLoading}
            className="px-6 py-3 rounded-md text-sm font-medium
                       bg-yellow-400 text-black hover:bg-yellow-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-2"
          >
            {isLoading && (
              <span
                className="w-4 h-4 border-2 border-black border-t-transparent
                               rounded-full animate-spin"
              />
            )}
            Save and Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePublish;
