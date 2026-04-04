import { Spinner } from '@/shared/components/ui/spinner';
import React from 'react';

const InfoCard = ({ icon, title, value, color, errorMessage, isError, isLoading }) => {
  return (
    <div className=" rounded flex items-center bg-white p-4  gap-4">
      <div className={`${color} text-white p-3 text-xl rounded-full`}>{icon}</div>
      <div className="">
        <h2 className=" text-slate-600 font-semibold text-xs font-heading text-nowrap">{title}</h2>
        {isError && <span className=" text-red-500 text-xs font-content">{errorMessage}</span>}

        {!isError && isLoading && <Spinner />}

        {!isError && !isLoading && (
          <span className={`font-semibold font-content text-xl ${value < 0 && 'text-red-500'}`}>
            ₹ {value}{' '}
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
