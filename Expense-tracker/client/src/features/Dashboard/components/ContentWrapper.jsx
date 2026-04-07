import CustomButton from '@/shared/components/custom/CustomButton';
import { ArrowRight } from 'lucide-react';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const   ContentWrapper = ({
  title,
  content,
  type,
  isError,
  errorMessage,
  isLoading,
  skeleton,
  skeletonCount = 4,
  navigationPath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 rounded space-y-2 bg-white p-4 min-h-100 max-h-110 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-slate-600 font-semibold text-xl font-heading">{title}</h2>

        {type !== 'chart' && (
          <CustomButton
            onClick={() => navigate(navigationPath)}
            active={false}
            rightIcon={<ArrowRight size={16} />}
            className="bg-slate-100 hover:bg-slate-200"
          >
            See All
          </CustomButton>
        )}
      </div>

      {/*------------- Error ------------ */}

      {isError && (
        <div className="text-red-500 text-sm  flex justify-center items-center">
          <span>{errorMessage || 'Something went wrong'}</span>
        </div>
      )}

      {/*--------------- Loading -------------------- */}
      {!isError && isLoading && (
        <div className="space-y-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i}>{skeleton}</div>
          ))}
        </div>
      )}

      {/*--------------------- Content --------------------- */}
      {!isError && !isLoading && content && <Suspense fallback={skeleton}>{content}</Suspense>}
    </div>
  );
};

export default ContentWrapper;
