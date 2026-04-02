import React from 'react'
import ExpenseRow from './ExpenseRow';

const Expenses = ({data}) => {
  return (
    <>
      {data.length === 0 && <p className=" text-center">No Expenses Found</p>}
      {data &&
        data.map((income) => {
          return <ExpenseRow rowData={income} key={income._id} />;
        })}
    </>
  )
}

export default Expenses