import React from 'react';
import TransactionRow from './TransactionRow';
import { useLocation } from 'react-router-dom';
import { formatCurrency } from '@/shared/utils/helpers';

const Transactions = ({ data = [], total = {} }) => {
  const path = useLocation().pathname;

  const { totalIncome = 0, totalExpense = 0, totalBalance = 0 } = total;

  return (
    <div className="space-y-4">
      {/* ✅ Summary Section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50 ${path === '/dashboard' ? 'hidden' : 'block'}`}
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-green-600 font-semibold text-lg">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="text-red-600 font-semibold text-lg">{formatCurrency(totalExpense)}</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-blue-600 font-semibold text-lg">{formatCurrency(totalBalance)}</p>
        </div>
      </div>

      {/* ✅ Transactions List */}
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No Transactions Found</p>
      ) : (
        data.map((transaction) => <TransactionRow rowData={transaction} key={transaction._id} />)
      )}
    </div>
  );
};

export default Transactions;
