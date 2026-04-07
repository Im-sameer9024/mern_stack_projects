import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddIncome } from '../hooks/useIncomes';
import InputField from '@/shared/components/custom/InputField';
import CustomButton from '@/shared/components/custom/CustomButton';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddIncomeValidationSchema } from '../validation/income.validationSchema';

const AddIncomeForm = ({ CloseForm }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver:zodResolver(AddIncomeValidationSchema),
    defaultValues: {
      source: '',
      amount: '',
      date: '',
    },
  });

  const { mutateAsync: AddIncome, isPending: AddIncomePending } = useAddIncome();

  const HandleSubmitAddIncome = async (data) => {
    try {
      await AddIncome(data);
      reset({
        source: '',
        amount: '',
        date: '',
      });
      CloseForm();
    } catch (error) {
      toast.error(GetApiErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(HandleSubmitAddIncome)} className=" space-y-4">
      <div>
        <h3 className="text-slate-600 font-semibold text-xl font-heading">Add Income</h3>
        <hr className=" border-slate-600" />
      </div>

      <InputField
        label={'Income Source'}
        placeholder={'salary'}
        type={'text'}
        name={'source'}
        error={errors.source}
        loading={AddIncomePending}
        control={control}
      />

      <InputField
        label={'Amount'}
        placeholder={'10000'}
        type={'number'}
        name={'amount'}
        error={errors.amount}
        loading={AddIncomePending}
        control={control}
      />

      <InputField
        label={'Date'}
        placeholder={'13-03-2026'}
        type={'date'}
        name={'date'}
        max={new Date().toISOString().split('T')[0]}
        error={errors.date}
        loading={AddIncomePending}
        control={control}
      />

      <CustomButton
        fullWidth={true}
        type="submit"
        active={true}
        loading={AddIncomePending}
        className=" mt-4"
      >
        Add Income
      </CustomButton>
    </form>
  );
};

export default AddIncomeForm;
