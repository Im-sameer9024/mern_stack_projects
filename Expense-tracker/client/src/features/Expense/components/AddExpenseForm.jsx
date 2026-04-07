import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddExpense } from '../hooks/useExpense';
import { GetApiErrorMessage } from '@/shared/utils/apiMessage';
import { toast } from 'sonner';
import InputField from '@/shared/components/custom/InputField';
import CustomButton from '@/shared/components/custom/CustomButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddExpenseValidationSchema } from '../validation/expense.validationSchema';

const AddExpenseForm = ({ CloseForm }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddExpenseValidationSchema),
    defaultValues: {
      source: '',
      amount: '',
      date: '',
    },
  });

  const { mutateAsync: AddExpense, isPending: AddExpensePending } = useAddExpense();

  const HandleSubmitAddExpense = async (data) => {
    try {
      await AddExpense(data);
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
    <form onSubmit={handleSubmit(HandleSubmitAddExpense)} className=" space-y-4">
      <div>
        <h3 className="text-slate-600 font-semibold text-xl font-heading">Add Expense</h3>
        <hr className=" border-slate-600" />
      </div>

      <InputField
        label={'Expense Source'}
        placeholder={'salary'}
        type={'text'}
        name={'source'}
        error={errors.source}
        loading={AddExpensePending}
        control={control}
      />

      <InputField
        label={'Amount'}
        placeholder={'10000'}
        type={'number'}
        name={'amount'}
        error={errors.amount}
        loading={AddExpensePending}
        control={control}
      />

      <InputField
        label={'Date'}
        placeholder={'13-03-2026'}
        type={'date'}
        name={'date'}
        max={new Date().toISOString().split('T')[0]}
        error={errors.date}
        loading={AddExpensePending}
        control={control}
      />

      <CustomButton
        fullWidth={true}
        type="submit"
        active={true}
        loading={AddExpensePending}
        className=" mt-4"
      >
        Add Expense
      </CustomButton>
    </form>
  );
};

export default AddExpenseForm;
