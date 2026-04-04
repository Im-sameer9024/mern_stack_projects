import React, { useState } from 'react';
import { useGetAllExpense } from '../hooks/useExpense';
import DataWrapper from '@/features/DataWrapper';
import FilterSection from '@/features/FilterSection';
import Expenses from '../components/Expenses';
import CustomPagination from '@/shared/components/custom/CustomPagination';
import EntryRowSkeleton from '@/shared/components/skeletons/EntryRowSkeleton';
import ContentWrapper from '@/features/Dashboard/components/ContentWrapper';
import BarChartSkeleton from '@/shared/components/skeletons/BarChartSkeleton';
import CustomBarChart from '@/features/Dashboard/components/CustomBarChart';

const ExpensePage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: 'latest',
    category: null,
    startDate: null,
    endDate: null,
  });

  const {
    data: ExpenseData,
    isPending: ExpensePending,
    error: ExpenseErrorMessage,
    isError: ExpenseError,
  } = useGetAllExpense({
    page: filters?.page,
    limit: filters?.limit,
    sort: filters?.sort,
    category: filters?.category,
    startDate: filters?.startDate,
    endDate: filters?.endDate,
  });

  const ExpenseFinalDate = ExpenseData?.data;

  const filterChangeHandler = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      // page:1
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
        content={<CustomBarChart apiData={ExpenseFinalDate?.chartData} />}
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
          content={<Expenses data={ExpenseFinalDate?.expenses || []} />}
          errorMessage={ExpenseErrorMessage?.message}
          isError={ExpenseError}
          isLoading={ExpensePending}
          skeleton={<EntryRowSkeleton />}
          skeletonCount={5}
        />

        {/* Pagination  */}
        <CustomPagination
          pagination={ExpenseFinalDate?.pagination}
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
