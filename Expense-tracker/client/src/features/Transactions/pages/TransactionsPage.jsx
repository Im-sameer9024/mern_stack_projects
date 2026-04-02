import DataWrapper from '@/features/DataWrapper';
import React, { useState } from 'react';
import Transactions from '../components/Transactions';
import { useGetAllTransactions } from '../hooks/useTransactions';
import EntryRowSkeleton from '@/shared/components/skeletons/EntryRowSkeleton';
import CustomPagination from '@/shared/components/custom/CustomPagination';
import FilterSection from '@/features/FilterSection';

const TransactionsPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: 'latest',
    startDate: null,
    endDate: null,
  });

  const {
    data: TransactionsData,
    isPending: TransactionPending,
    error: TransactionErrorMessage,
    isError: TransactionError,
  } = useGetAllTransactions({
    page: filters.page,
    limit: filters.limit,
    sort: filters.sort,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  const TransactionsFinalData = TransactionsData?.data;

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
    <div className="bg-white rounded p-4">
      <DataWrapper
        title={'Transactions Details'}
        filter={
          <FilterSection
            filters={filters}
            filterChangeHandler={filterChangeHandler}
            onReset={resetFilter}
          />
        }
        content={<Transactions data={TransactionsFinalData?.allTransactions || []} />}
        errorMessage={TransactionErrorMessage?.message}
        isError={TransactionError}
        isLoading={TransactionPending}
        skeleton={<EntryRowSkeleton />}
        skeletonCount={5}
      />

      {/* Pagination  */}
      <CustomPagination
        pagination={TransactionsFinalData?.pagination}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </div>
  );
};

export default TransactionsPage;
