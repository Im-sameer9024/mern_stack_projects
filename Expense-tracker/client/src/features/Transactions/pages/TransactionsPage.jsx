import DataWrapper from '@/features/DataWrapper';
import React, { useMemo, useState } from 'react';
import Transactions from '../components/Transactions';
import { useDownloadTransactionPdf, useGetAllTransactions } from '../hooks/useTransactions';
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
    data: TransactionsData,
    isPending: TransactionPending,
    error: TransactionErrorMessage,
    isError: TransactionError,
  } = useGetAllTransactions(queryParams);

  const{mutate: DownloadTransactionsPDF, isPending: DownloadTransactionsPDFPending} = useDownloadTransactionPdf();

  const TransactionsFinalData = TransactionsData?.data;


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
        content={<Transactions data={TransactionsFinalData?.allTransactions || []} total={TransactionsFinalData?.totalDetails[0]} />}
        errorMessage={TransactionErrorMessage?.message}
        isError={TransactionError}
        isLoading={TransactionPending}
        skeleton={<EntryRowSkeleton />}
        skeletonCount={5}

         startDate={filters?.startDate}
          endDate={filters?.endDate}
          DownloadPDF={DownloadTransactionsPDF}
          DownloadPDFPending={DownloadTransactionsPDFPending} 
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
