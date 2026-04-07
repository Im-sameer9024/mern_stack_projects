import React, { useMemo, useState } from 'react';
import { useDownloadIncomePdf, useGetAllIncomes } from '../hooks/useIncomes';
import DataWrapper from '@/features/DataWrapper';
import FilterSection from '@/features/FilterSection';
import Incomes from '../components/Incomes';
import EntryRowSkeleton from '@/shared/components/skeletons/EntryRowSkeleton';
import CustomPagination from '@/shared/components/custom/CustomPagination';
import ContentWrapper from '@/features/Dashboard/components/ContentWrapper';
import BarChartSkeleton from '@/shared/components/skeletons/BarChartSkeleton';
import CustomBarChart from '@/features/Dashboard/components/CustomBarChart';
import AddIncomeForm from '../components/AddIncomeForm';

const IncomePage = () => {
  //-------------------------- add income ------------------------------

  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const OpenForm = () => {
    setShowIncomeForm(true);
  };

  const CloseForm = () => {
    setShowIncomeForm(false);
  };

  //------------------------- filters -----------------------------

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: 'latest',
    source: null,
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
    data: IncomesData,
    isPending: IncomesPending,
    error: IncomesErrorMessage,
    isError: IncomesError,
  } = useGetAllIncomes(queryParams);

  const { mutate: DownloadIncomePDF, isPending: DownloadIncomePDFPending } = useDownloadIncomePdf();

  const IncomesFinalData = IncomesData?.data;

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
        title={'Income Overview'}
        type={'chart'}
        errorMessage={IncomesErrorMessage?.message}
        isError={IncomesError}
        isLoading={IncomesPending}
        skeleton={<BarChartSkeleton />}
        skeletonCount={1}
        content={<CustomBarChart apiData={IncomesFinalData?.chartData} />}
      />

      <div className="bg-white rounded p-4">
        <DataWrapper
          title={'Incomes Details'}
          //-------------filters -----------------
          filter={
            <FilterSection
              filters={filters}
              filterChangeHandler={filterChangeHandler}
              onReset={resetFilter}
            />
          }
          startDate={filters?.startDate}
          endDate={filters?.endDate}
          DownloadPDF={DownloadIncomePDF}
          DownloadPDFPending={DownloadIncomePDFPending}
          //----------- show contents of data -----------
          content={
            <Incomes
              showIncomeForm={showIncomeForm}
              AddIncomeForm={<AddIncomeForm CloseForm={CloseForm} />}
              CloseForm={CloseForm}
              OpenForm={OpenForm}
              data={IncomesFinalData?.incomes || []}
              total={IncomesFinalData?.totalDetails[0]?.totalIncome || 0}
            />
          }
          errorMessage={IncomesErrorMessage?.message}
          isError={IncomesError}
          isLoading={IncomesPending}
          skeleton={<EntryRowSkeleton />}
          skeletonCount={5}
          //------------- add income ---------------
        />

        {/* Pagination  */}
        <CustomPagination
          pagination={IncomesFinalData?.pagination}
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

export default IncomePage;
