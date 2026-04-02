import React from 'react';
import TransactionRow from './TransactionRow';

const Transactions = ({ data }) => {
  return (
    <>
      {data.length === 0 && <p className=" text-center">No Transactions Found</p>}
      {data &&
        data.map((transaction) => {
          return <TransactionRow rowData={transaction} key={transaction._id} />;
        })}
    </>
  );
};

export default Transactions;
