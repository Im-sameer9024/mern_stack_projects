import React, { lazy } from 'react';

import TotalDetails from '../components/TotalDetails';
import Transactions from '@/features/Transactions/components/Transactions';
import ContentWrapper from '../components/ContentWrapper';
import { useGetAllTransactions } from '@/features/Transactions/hooks/useTransactions';
import EntryRowSkeleton from '@/shared/components/skeletons/EntryRowSkeleton';
import { useGetAllIncomes } from '@/features/Income/hooks/useIncomes';
import Incomes from '@/features/Income/components/Incomes';
import { useGetAllExpense } from '@/features/Expense/hooks/useExpense';
import Expenses from '@/features/Expense/components/Expenses';

const BarChartSkeleton = lazy(() => import('@/shared/components/skeletons/BarChartSkeleton'));
const CustomBarChart = lazy(() => import('../components/CustomBarChart'));
const FinancialChartSkeleton = lazy(
  () => import('@/shared/components/skeletons/FinancialChartSkeleton')
);
const FinancialPieChart = lazy(() => import('../components/FinancialPieChart'));

const DashboardPage = () => {
  //------------------------ api hooks --------------------

  // transactions
  const {
    data: TransactionsData,
    isPending: TransactionPending,
    error: TransactionErrorMessage,
    isError: TransactionError,
  } = useGetAllTransactions({
    page: 1,
    limit: 5,
  });

  // incomes

  const {
    data: IncomesData,
    isPending: IncomesPending,
    error: IncomesErrorMessage,
    isError: IncomesError,
  } = useGetAllIncomes({ page: 1, limit: 5 });

  // expense

  const {
    data: ExpenseData,
    isPending: ExpensePending,
    error: ExpenseErrorMessage,
    isError: ExpenseError,
  } = useGetAllExpense({
    page: 1,
    limit: 5,
  });

  const TransactionsFinalData = TransactionsData?.data;
  const IncomesFinalData = IncomesData?.data;
  const ExpenseFinalData = ExpenseData?.data;

  const balanceData = [
    {
      name: 'Total Balance',
      amount: TransactionsFinalData?.totalDetails[0]?.totalBalance || 0,
    },
    {
      name: 'Total Expenses',
      amount: TransactionsFinalData?.totalDetails[0]?.totalExpense || 0,
    },
    {
      name: 'Total Income',
      amount: TransactionsFinalData?.totalDetails[0]?.totalIncome || 0,
    },
  ];

  return (
    <>
      {/*---------------- total information section -------------- */}

      <TotalDetails
        data={TransactionsFinalData?.totalDetails[0]}
        errorMessage={TransactionErrorMessage?.message}
        isError={TransactionError}
        isLoading={TransactionPending}
      />

      {/*------------------------ Transaction section ------------------------- */}

      <div className=" mt-4 w-full flex flex-col lg:flex-row gap-4">
        {/*--------------- recent Transactions---------------  */}
        <ContentWrapper
          title={'Recent Transaction'}
          content={<Transactions data={TransactionsFinalData?.allTransactions} />}
          errorMessage={TransactionErrorMessage?.message}
          isError={TransactionError}
          isLoading={TransactionPending}
          skeleton={<EntryRowSkeleton />}
          skeletonCount={5}
          navigationPath={'/transactions'}
        />
        {/*--------------- Financial Overview---------------  */}
        <ContentWrapper
          title={'Financial Overview'}
          type={'chart'}
          errorMessage={TransactionErrorMessage?.message}
          isError={TransactionError}
          isLoading={TransactionPending}
          skeleton={<FinancialChartSkeleton />}
          skeletonCount={1}
          content={
            <FinancialPieChart
              data={balanceData || []}
              showTextAnchor={true}
              label={'Total Balance'}
              totalAmount={TransactionsFinalData?.totalDetails[0]?.totalBalance || 0}
              colors={['#0088FE', '#00C49F', '#FFBB28']}
            />
          }
        />
      </div>

      {/*-------------------------- Income section ---------------------- */}

      <div className=" mt-4 w-full flex flex-col lg:flex-row gap-4">
        {/*--------------- Recent Income---------------  */}
        <ContentWrapper
          title={'Recent Incomes'}
          content={<Incomes data={IncomesFinalData?.incomes} />}
          errorMessage={IncomesErrorMessage?.message}
          isError={IncomesError}
          isLoading={IncomesPending}
          skeleton={<EntryRowSkeleton />}
          skeletonCount={5}
          navigationPath={'/incomes'}
        />

        <ContentWrapper
          title={'Incomes Overview'}
          type={'chart'}
          errorMessage={IncomesErrorMessage?.message}
          isError={IncomesError}
          isLoading={IncomesPending}
          skeleton={<BarChartSkeleton />}
          skeletonCount={1}
          content={<CustomBarChart apiData={IncomesFinalData?.chartData} />}
        />
      </div>

      {/*----------------------------- Expense section ------------------------------ */}
      <div className=" mt-4 w-full flex flex-col lg:flex-row gap-4">
        {/*--------------- Recent Income---------------  */}
        <ContentWrapper
          title={'Recent Expenses'}
          content={<Expenses data={ExpenseFinalData?.expenses} />}
          errorMessage={ExpenseErrorMessage?.message}
          isError={ExpenseError}
          isLoading={ExpensePending}
          skeleton={<EntryRowSkeleton />}
          skeletonCount={5}
          navigationPath={'/expenses'}
        />

        <ContentWrapper
          title={'Expenses Overview'}
          type={'chart'}
          errorMessage={ExpenseErrorMessage?.message}
          isError={ExpenseError}
          isLoading={ExpensePending}
          skeleton={<BarChartSkeleton />}
          skeletonCount={1}
          content={<CustomBarChart apiData={ExpenseFinalData?.chartData} />}
        />
      </div>
    </>
  );
};

export default DashboardPage;
