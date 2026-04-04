import React, { lazy } from 'react';
import IncomeRow from './IncomeRow';
import { Plus } from 'lucide-react';
import CustomButton from '@/shared/components/custom/CustomButton';
import { useLocation } from 'react-router-dom';

const Modal = lazy(() => import('@/shared/components/custom/Modal'));

const Incomes = ({ data, AddIncomeForm, showIncomeForm, CloseForm, OpenForm }) => {
  const path = useLocation().pathname;

  return (
    <>
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
