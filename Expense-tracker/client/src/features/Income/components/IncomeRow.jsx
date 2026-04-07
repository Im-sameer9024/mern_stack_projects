import CustomButton from '@/shared/components/custom/CustomButton';
import { formatDate } from '@/shared/utils/helpers';
import { PencilLine, Trash } from 'lucide-react';
import React, { lazy, useEffect, useState } from 'react';
import { LuTrendingUp } from 'react-icons/lu';
import UpdateIncomeForm from './UpdateIncomeForm';
import { useDeleteIncome, useGetSingleIncome, useUpdateIncome } from '../hooks/useIncomes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateIncomeValidationSchema } from '../validation/income.validationSchema';

const Modal = lazy(() => import('@/shared/components/custom/Modal'));

const IncomeRow = ({ rowData, path }) => {
  const [incomeId, setIncomeId] = useState(null);
  const [showUpdateIncomeForm, setShowUpdateIncomeForm] = useState(false);
  const [showDeleteIncomeModal, setShowDeleteIncomeModal] = useState(false);

  const formatDateForInput = (date) => {
    if (!date) return '';

    const d = new Date(date);

    if (isNaN(d.getTime())) return ''; // invalid date protection

    return d.toISOString().split('T')[0];
  };

  const OpenDeleteForm = (id) => {
    setIncomeId(id);

    setShowDeleteIncomeModal(true);
  };

  const CloseDeleteForm = () => {
    setIncomeId(null);
    setShowDeleteIncomeModal(false);
  };

  const OpenUpdateForm = (id) => {
    setIncomeId(id);

    setShowUpdateIncomeForm(true);
  };
  const CloseUpdateForm = () => {
    setIncomeId(null);
    setShowUpdateIncomeForm(false);
  };

  //---------------------------- Update income -----------------------------
  const { mutateAsync: UpdateIncome, isPending: isUpdating } = useUpdateIncome();

  //------------------------- get income data----------------------

  const {
    data: IncomeData,
    isPending: IncomePending,
    error: IncomeError,
    isError: IncomeIsError,
  } = useGetSingleIncome(incomeId);

  const IncomeActualData = IncomeData?.data;

  //----------------------- Delete Income -------------------------------

  const { mutate: DeleteIncome, isPending: isDeleting } = useDeleteIncome();

  const DeleteHandler = () => {
    DeleteIncome({
      incomeId: incomeId,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UpdateIncomeValidationSchema),
  });

  useEffect(() => {
    if (IncomeActualData) {
      reset({
        source: IncomeActualData?.source || '',
        amount: IncomeActualData?.amount || '',
        date: formatDateForInput(IncomeActualData?.date) || '',
      });
    }
  }, [IncomeActualData, reset]);

  const HandleUpdateIncome = async (data) => {
    try {
      const finalData = {
        incomeId: incomeId,
        date: data?.date,
        source: data?.source,
        amount: data?.amount,
      };

      console.log(finalData);

      await UpdateIncome(finalData);

      CloseUpdateForm(); // close modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between  p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-green-50`}
      >
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
            className={`flex items-center gap-1 font-semibold text-xs  rounded px-2 py-1  text-green-500 bg-green-100  `}
          >
            <span>+ ₹{rowData?.amount}</span>
            <LuTrendingUp />
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

      {/*------------------- Update Income form ------------------ */}
      <Modal
        isVisible={showUpdateIncomeForm}
        content={
          <UpdateIncomeForm
            control={control}
            HandleUpdateIncome={HandleUpdateIncome}
            handleSubmit={handleSubmit}
            errors={errors}
            isUpdating={isUpdating}
            //------- single income data----
            IncomeData={IncomeActualData}
            IncomePending={IncomePending}
            IncomeError={IncomeError}
            IncomeIsError={IncomeIsError}
          />
        }
        onClose={CloseUpdateForm}
        width={'50%'}
      />

      {/*-------------------- Delete Income confirmation modal ------------------ */}

      <Modal
        isVisible={showDeleteIncomeModal}
        onClose={CloseDeleteForm}
        content={
          <div>
            <p>Are you sure you want to delete this income?</p>
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
        width={'30%'}
      />
    </>
  );
};

export default IncomeRow;
