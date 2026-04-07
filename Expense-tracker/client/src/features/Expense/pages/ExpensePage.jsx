import React, { useMemo, useState } from 'react';
import { useDownloadExpensePdf, useGetAllExpense } from '../hooks/useExpense';
import DataWrapper from '@/features/DataWrapper';
import FilterSection from '@/features/FilterSection';
import Expenses from '../components/Expenses';
import CustomPagination from '@/shared/components/custom/CustomPagination';
import EntryRowSkeleton from '@/shared/components/skeletons/EntryRowSkeleton';
import ContentWrapper from '@/features/Dashboard/components/ContentWrapper';
import BarChartSkeleton from '@/shared/components/skeletons/BarChartSkeleton';
import CustomBarChart from '@/features/Dashboard/components/CustomBarChart';
import AddExpenseForm from '../components/AddExpenseForm';

const ExpensePage = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const OpenForm = () => {
    setShowExpenseForm(true);
  };

  const CloseForm = () => {
    setShowExpenseForm(false);
  };

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: 'latest',
    category: null,
    startDate: null,
    endDate: null,
  });

  const queryParams = useMemo(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sort: filters.sort,
      source: filters.source,
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [filters]
  );

  const {
    data: ExpenseData,
    isPending: ExpensePending,
    error: ExpenseErrorMessage,
    isError: ExpenseError,
  } = useGetAllExpense(queryParams);

  const ExpenseFinalData = ExpenseData?.data;


  const {
    mutate: DownloadExpensePDF,
    isPending: DownloadExpensePDFPending,
  } = useDownloadExpensePdf();


  const filterChangeHandler = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const resetFilter = () => {
    setFilters({
      page: 1,
      limit: 10,
      sort: 'latest',
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div className=" space-y-4">
      <ContentWrapper
        title={'Expense Overview'}
        type={'chart'}
        errorMessage={ExpenseErrorMessage?.message}
        isError={ExpenseError}
        isLoading={ExpensePending}
        skeleton={<BarChartSkeleton />}
        skeletonCount={1}
        content={<CustomBarChart apiData={ExpenseFinalData?.chartData} />}
      />
      <div className="bg-white rounded p-4">
        <DataWrapper
          title={'Expense Details'}
          filter={
            <FilterSection
              filters={filters}
              filterChangeHandler={filterChangeHandler}
              onReset={resetFilter}
            />
          }
          DownloadPDF={DownloadExpensePDF}
          DownloadPDFPending={DownloadExpensePDFPending}
          startDate={filters?.startDate}
          endDate={filters.endDate}
          content={
            <Expenses
              showExpenseForm={showExpenseForm}
              AddExpenseForm={<AddExpenseForm CloseForm={CloseForm} />}
              CloseForm={CloseForm}
              OpenForm={OpenForm}
              data={ExpenseFinalData?.expenses || []}
              total={ExpenseFinalData?.totalDetails[0]?.totalExpense || 0}
            />
          }
          errorMessage={ExpenseErrorMessage?.message}
          isError={ExpenseError}
          isLoading={ExpensePending}
          skeleton={<EntryRowSkeleton />}
          skeletonCount={5}
        />

        {/* Pagination  */}
        <CustomPagination
          pagination={ExpenseFinalData?.pagination}
          onPageChange={(page) =>
            setFilters((prev) => ({
              ...prev,
              page,
            }))
          }
        />
      </div>
    </div>
  );
};

export default ExpensePage;
