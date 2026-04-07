import React, { lazy } from 'react';
import IncomeRow from './IncomeRow';
import { Plus } from 'lucide-react';
import CustomButton from '@/shared/components/custom/CustomButton';
import { useLocation } from 'react-router-dom';
import { formatCurrency } from '@/shared/utils/helpers';

const Modal = lazy(() => import('@/shared/components/custom/Modal'));

const Incomes = ({ data, AddIncomeForm, showIncomeForm, CloseForm, OpenForm, total }) => {
  const path = useLocation().pathname;

  return (
    <>
      {/* ✅ Summary Section */}
      <div
        className={`grid grid-cols-1  gap-4 p-4 border rounded-lg bg-gray-50 ${path === '/dashboard' ? 'hidden' : 'block'}`}
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-green-600 font-semibold text-lg">{formatCurrency(total)}</p>
        </div>
      </div>

      <div className={`my-4 ${path === '/dashboard' ? 'hidden' : 'block'}`}>
        <CustomButton onClick={OpenForm} leftIcon={<Plus />} active={true}>
          Add Income
        </CustomButton>
      </div>
      {/*-------------------- Add income related ------------------------- */}

      <Modal isVisible={showIncomeForm} content={AddIncomeForm} onClose={CloseForm} width={'50%'} />
      {data.length === 0 && <p className=" text-center">No Incomes Found</p>}
      {data &&
        data.map((income) => {
          return <IncomeRow rowData={income} key={income._id} path={path} />;
        })}
    </>
  );
};

export default Incomes;
