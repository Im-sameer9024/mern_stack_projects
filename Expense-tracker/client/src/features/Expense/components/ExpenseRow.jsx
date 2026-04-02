import React, { memo } from 'react';
import { formatDate } from '@/shared/utils/helpers';
import { LuTrendingDown } from 'react-icons/lu';

const ExpenseRow = ({ rowData }) => {
  return (
    <div className=" flex items-center justify-between hover:bg-red-50 p-2 rounded-md transition-all duration-300 ease-in-out">
      {/* left side  */}

      <div className=" -space-y-1">
        <h3 className=" text-slate-600 font-semibold text-sm capitalize ">{rowData?.category}</h3>
        <span className=" text-slate-400 font-light text-xs  text-nowrap">
          {formatDate(rowData?.date)}
        </span>
      </div>

      {/* Right side  */}
      <div
        className={`flex items-center gap-1 font-semibold text-xs  rounded p-1  text-red-500 bg-red-100  `}
      >
        <span>- ₹{rowData?.amount}</span>
        <LuTrendingDown />
      </div>
    </div>
  );
};

export default memo(ExpenseRow);
