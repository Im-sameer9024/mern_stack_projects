import React from 'react';
import InputField from '@/shared/components/custom/InputField';
import CustomButton from '@/shared/components/custom/CustomButton';
import IncomeFormSkeleton from '@/shared/components/skeletons/IncomeFormSkeleton';

const UpdateIncomeForm = ({
  control, // ✅ use control
  handleSubmit,
  errors,
  HandleUpdateIncome,
  isUpdating,
  // IncomeData,
  IncomePending,
  IncomeError,
  IncomeIsError,
}) => {
  return (
    <>
      {IncomeIsError && IncomeError?.message && (
        <p className="text-red-500 font-semibold text-sm">{IncomeError.message}</p>
      )}

      {IncomePending && <IncomeFormSkeleton />}

      <form onSubmit={handleSubmit(HandleUpdateIncome)} className="space-y-4">
        <div>
          <h3 className="text-slate-600 font-semibold text-xl font-heading">Update Income</h3>
          <hr className="border-slate-600" />
        </div>

        {IncomeIsError && IncomeError?.message && (
          <p className="text-red-500 font-semibold text-sm">{IncomeError.message}</p>
        )}

        {IncomePending ? (
          <IncomeFormSkeleton />
        ) : (
          <>
            <InputField
              label="Income Source"
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
              max={new Date().toISOString().split('T')[0]}
              error={errors.date}
              loading={isUpdating}
              control={control}
            />
          </>
        )}

        <CustomButton fullWidth type="submit" active loading={isUpdating} className="mt-4">
          Update Income
        </CustomButton>
      </form>
    </>
  );
};

export default UpdateIncomeForm;
