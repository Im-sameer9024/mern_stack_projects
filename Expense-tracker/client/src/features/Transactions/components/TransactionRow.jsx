import { formatDate } from '@/shared/utils/helpers';
import React, { memo } from 'react';
import { LuTrendingDown, LuTrendingUp } from 'react-icons/lu';

const TransactionRow = ({ rowData }) => {
  return (
    <div className={`flex items-center justify-between  p-2 rounded-md transition-all duration-300 ease-in-out ${rowData?.transactionType === 'income' ? 'hover:bg-green-50' : 'hover:bg-red-50'}`}>
      {/* left side  */}
      <div className=" -space-y-1">
        <h3 className=" text-slate-600 font-semibold text-sm capitalize ">{rowData?.source}</h3>
        <span className=" text-slate-400 font-light text-xs  text-nowrap">
          {formatDate(rowData?.transactionDate)}
        </span>
      </div>

      {/* Right side  */}
      <div
        className={`flex items-center gap-1 font-semibold text-xs  rounded p-1  ${
          rowData?.transactionType === 'income'
            ? 'text-green-500 bg-green-100'
            : 'text-red-500 bg-red-100'
        } `}
      >
        <span>
          {rowData?.transactionType === 'income' ? '+' : '-'} ₹{rowData?.transactionAmount}
        </span>
        {rowData?.transactionType === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
      </div>
    </div>
  );
};

export default memo(TransactionRow);
