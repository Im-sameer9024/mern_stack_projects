import React, { memo, useEffect, useState } from 'react';
import { formatDate } from '@/shared/utils/helpers';
import { LuTrendingDown } from 'react-icons/lu';
import Modal from '@/shared/components/custom/Modal';
import { useDeleteExpense, useGetSingleExpense, useUpdateExpense } from '../hooks/useExpense';
import { useForm } from 'react-hook-form';
import UpdateExpenseForm from './UpdateExpenseForm';
import CustomButton from '@/shared/components/custom/CustomButton';
import { PencilLine, Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateExpenseValidationSchema } from '../validation/expense.validationSchema';

const ExpenseRow = ({ rowData, path }) => {
  const [expenseId, setExpenseId] = useState(null);
  const [showUpdateExpenseForm, setShowUpdateExpenseForm] = useState(false);
  const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);

  const formatDateForInput = (date) => {
    if (!date) return '';

    const d = new Date(date);

    if (isNaN(d.getTime())) return ''; // invalid date protection

    return d.toISOString().split('T')[0];
  };

  const OpenDeleteForm = (id) => {
    setExpenseId(id);

    setShowDeleteExpenseModal(true);
  };

  const CloseDeleteForm = () => {
    setExpenseId(null);
    setShowDeleteExpenseModal(false);
  };

  const OpenUpdateForm = (id) => {
    setExpenseId(id);

    setShowUpdateExpenseForm(true);
  };
  const CloseUpdateForm = () => {
    setExpenseId(null);
    setShowUpdateExpenseForm(false);
  };
  //-------------------- Update Expense  --------------------
  const { mutateAsync: UpdateExpense, isPending: isUpdating } = useUpdateExpense();

  //----------------- Get Expense Data --------------------

  const {
    data: ExpenseData,
    isPending: ExpensePending,
    error: ExpenseError,
    isError: ExpenseIsError,
  } = useGetSingleExpense(expenseId);

  const ExpenseActualData = ExpenseData?.data;

  //---------------- Delete Expense -------------------------

  const { mutate: DeleteExpense, isPending: isDeleting } = useDeleteExpense();

  const DeleteHandler = () => {
    DeleteExpense({
      expenseId: expenseId,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UpdateExpenseValidationSchema),
    defaultValues: {
      source: '',
      amount: '',
      date: '',
    },
  });

  useEffect(() => {
    if (ExpenseActualData) {
      reset({
        source: ExpenseActualData?.source || '',
        amount: ExpenseActualData?.amount || '',
        date: formatDateForInput(ExpenseActualData?.date) || '',
      });
    }
  }, [ExpenseActualData, reset]);

  const HandleUpdateExpense = async (data) => {
    try {
      const finalData = {
        expenseId: expenseId,
        date: data?.date,
        source: data?.source,
        amount: data?.amount,
      };

      await UpdateExpense(finalData);

      CloseUpdateForm(); // close modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-between hover:bg-red-50 p-2 rounded-md transition-all duration-300 ease-in-out">
        {/* left side  */}

        <div className=" -space-y-1">
          <h3 className=" text-slate-600 font-semibold text-sm capitalize ">{rowData?.source}</h3>
          <span className=" text-slate-400 font-light text-xs  text-nowrap">
            {formatDate(rowData?.date)}
          </span>
        </div>

        {/* Right side  */}
        <div className=" flex gap-8">
          <div
            className={`flex items-center gap-1 font-semibold text-xs  rounded px-2 py-1  text-red-500 bg-red-100  `}
          >
            <span>- ₹{rowData?.amount}</span>
            <LuTrendingDown />
          </div>

          {/* Actions buttons  */}
          <div className={`${path === '/dashboard' ? 'hidden' : ' flex gap-2'}`}>
            <CustomButton
              onClick={() => OpenUpdateForm(rowData?._id)}
              active={false}
              className=" rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600"
              leftIcon={<PencilLine />}
            />
            <CustomButton
              onClick={() => OpenDeleteForm(rowData?._id)}
              active={false}
              className=" rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 "
              leftIcon={<Trash />}
            />
          </div>
        </div>
      </div>

      {/*--------------------- Update Expense Form --------------------------- */}

      <Modal
        isVisible={showUpdateExpenseForm}
        onClose={CloseUpdateForm}
        width={'50%'}
        content={
          <UpdateExpenseForm
            control={control}
            HandleUpdateExpense={HandleUpdateExpense}
            handleSubmit={handleSubmit}
            errors={errors}
            isUpdating={isUpdating}
            //------- single expense data----
            ExpenseData={ExpenseActualData}
            ExpensePending={ExpensePending}
            ExpenseError={ExpenseError}
            ExpenseIsError={ExpenseIsError}
          />
        }
      />

      {/*----------------- Delete Expense Form --------------  */}

      <Modal
        isVisible={showDeleteExpenseModal}
        width={'30%'}
        onClose={CloseDeleteForm}
        content={
          <div>
            <p>Are you sure you want to delete this Expense?</p>
            <div className=" mt-4 gap-4 flex ">
              <CustomButton onClick={() => DeleteHandler()} loading={isDeleting} active={true}>
                Delete
              </CustomButton>
              <CustomButton active={false} onClick={CloseDeleteForm}>
                Cancel
              </CustomButton>
            </div>
          </div>
        }
      />
    </>
  );
};

export default memo(ExpenseRow);
