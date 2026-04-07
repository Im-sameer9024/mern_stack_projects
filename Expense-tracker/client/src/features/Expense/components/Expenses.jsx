import React from 'react';
import ExpenseRow from './ExpenseRow';
import { useLocation } from 'react-router-dom';
import CustomButton from '@/shared/components/custom/CustomButton';
import { Plus } from 'lucide-react';
import Modal from '@/shared/components/custom/Modal';
import { formatCurrency } from '@/shared/utils/helpers';

const Expenses = ({ data, AddExpenseForm, showExpenseForm, CloseForm, OpenForm,total }) => {
  const path = useLocation().pathname;

  return (
    <>
     {/* ✅ Summary Section */}
          <div
            className={`grid grid-cols-1  gap-4 p-4 border rounded-lg bg-gray-50 ${path === '/dashboard' ? 'hidden' : 'block'}`}
          >
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Expense</p>
              <p className="text-red-600 font-semibold text-lg">{formatCurrency(total)}</p>
            </div>
          </div>

          {/*------------ add button -------------- */}
      <div className={`my-4 ${path === '/dashboard' ? 'hidden' : 'block'}`}>
        <CustomButton onClick={OpenForm} leftIcon={<Plus />} active={true}>
          Add Expense
        </CustomButton>
      </div>
      {/*-------------------- Add income related ------------------------- */}

      <Modal
        isVisible={showExpenseForm}
        content={AddExpenseForm}
        onClose={CloseForm}
        width={'50%'}
      />
      {data.length === 0 && <p className=" text-center">No Expenses Found</p>}
      {data &&
        data.map((income) => {
          return <ExpenseRow path={path} rowData={income} key={income._id} />;
        })}
    </>
  );
};

export default Expenses;
