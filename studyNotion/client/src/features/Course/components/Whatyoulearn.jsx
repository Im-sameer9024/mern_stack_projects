// components/shared/WhatYouLearn/WhatYouLearn.jsx
import { Check } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// WhatYouLearn
//
// Props:
//   items — string[] — whatYouWillLearn array from API
// ─────────────────────────────────────────────────────────────────────────────

const WhatYouLearn = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="border border-richBlack-600 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-bold text-white">What you'll learn</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check
              size={15}
              className="text-yellow-400 shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            <p className="text-sm text-richBlack-200 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouLearn;