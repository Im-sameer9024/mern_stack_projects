import CustomButton from '@/shared/components/custom/CustomButton';
import React, { Suspense } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
const DataWrapper = ({
  title,
  content,
  isError,
  filter,
  errorMessage,
  isLoading,
  skeleton,
  skeletonCount = 4,
}) => {
  return (
    <div className=" ">
      {/* header section  */}
      <div className="flex items-center justify-between">
        <h2 className="text-slate-600 font-semibold text-xl font-heading">{title}</h2>
        <CustomButton leftIcon={<MdOutlineFileDownload />}>Download</CustomButton>
      </div>

      {/*------------ filter section ------------ */}

      {filter && <div className="mt-4">{filter}</div>}

      {/*----------------- data details ------------- */}
      {isError && (
        <div className="text-red-500 text-sm  flex justify-center items-center">
          <span>{errorMessage || 'Something went wrong'}</span>
        </div>
      )}

      {!isError && isLoading && (
        <div className="space-y-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i}>{skeleton}</div>
          ))}
        </div>
      )}

      {!isError && !isLoading && <Suspense fallback={skeleton}>{content}</Suspense>}

      {/*--------------- pagination -------------- */}
    </div>
  );
};

export default DataWrapper;
