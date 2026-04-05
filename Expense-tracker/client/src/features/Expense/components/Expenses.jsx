import React from 'react';
import ExpenseRow from './ExpenseRow';
import { useLocation } from 'react-router-dom';
import CustomButton from '@/shared/components/custom/CustomButton';
import { Plus } from 'lucide-react';
import Modal from '@/shared/components/custom/Modal';

const Expenses = ({ data, AddExpenseForm, showExpenseForm, CloseForm, OpenForm }) => {
  const path = useLocation().pathname;

  return (
    <>
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
