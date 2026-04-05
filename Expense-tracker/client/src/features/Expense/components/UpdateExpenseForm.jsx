import CustomButton from '@/shared/components/custom/CustomButton'
import InputField from '@/shared/components/custom/InputField'
import ExpenseFormSkeleton from '@/shared/components/skeletons/ExpenseFormSkeleton'
import React from 'react'

const UpdateExpenseForm = ({
    control, // ✅ use control
  handleSubmit,
  errors,
  HandleUpdateExpense,
  isUpdating,
  ExpenseData,
  ExpensePending,
  ExpenseError,
  ExpenseIsError,
}) => {
  return (
     <>
      {ExpenseIsError && ExpenseError?.message && (
        <p className="text-red-500 font-semibold text-sm">{ExpenseError.message}</p>
      )}

      {ExpensePending && <ExpenseFormSkeleton />}

      {!ExpenseError && !ExpensePending && ExpenseData && (
        <form onSubmit={handleSubmit(HandleUpdateExpense)} className="space-y-4">
          <div>
            <h3 className="text-slate-600 font-semibold text-xl font-heading">Update Income</h3>
            <hr className="border-slate-600" />
          </div>

          <InputField
            label="Expense Source"
            name="source"
            type="text"
            placeholder="salary"
            error={errors.source}
            loading={isUpdating}
            control={control}
          />

          <InputField
            label="Amount"
            name="amount"
            type="number"
            placeholder="10000"
            error={errors.amount}
            loading={isUpdating}
            control={control}
          />

          <InputField
            label="Date"
            name="date"
            type="date"
            error={errors.date}
            loading={isUpdating}
            control={control}
          />

          <CustomButton fullWidth type="submit" active loading={isUpdating} className="mt-4">
            Update Expense
          </CustomButton>
        </form>
      )}
    </>
  )
}

export default UpdateExpenseForm