import React from 'react';
import InfoCard from '../components/InfoCard';
import { FaWallet, FaHandHoldingUsd } from 'react-icons/fa';

import { IoMdCard } from 'react-icons/io';

const TotalDetails = ({ data, errorMessage, isError, isLoading }) => {
  return (
    <div className=" grid md:grid-cols-3 grid-cols-1  gap-4">
      {/*-------- total balance --------- */}
      <InfoCard
        icon={<IoMdCard />}
        title={'Total Balance'}
        value={data?.totalBalance || 0}
        color={'bg-blue-500'}
        errorMessage={errorMessage}
        isError={isError}
        isLoading={isLoading}
      />

      {/*--------- total income --------- */}
      <InfoCard
        icon={<FaWallet />}
        title={'Total Income'}
        value={data?.totalIncome || 0}
        color={'bg-orange-500'}
        errorMessage={errorMessage}
        isError={isError}
        isLoading={isLoading}
      />

      {/*------------- total expense---------------  */}
      <InfoCard
        icon={<FaHandHoldingUsd />}
        title={'Total Expense'}
        value={data?.totalExpense || 0}
        color={'bg-red-500'}
        errorMessage={errorMessage}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TotalDetails;
