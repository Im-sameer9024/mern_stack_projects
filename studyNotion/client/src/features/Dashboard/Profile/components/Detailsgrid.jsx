import React from 'react';
import DetailField from './DetailField';

const Detailsgrid = ({ userDetails, additionalDetails }) => {
  const fields = [
    {
      label: 'First Name',
      value: userDetails?.firstName,
    },
    { label: 'Last Name', value: userDetails?.lastName },
    { label: 'Email', value: userDetails?.email },
    { label: 'Phone Number', value: additionalDetails?.contactNumber },
    { label: 'Gender', value: additionalDetails?.gender },
    { label: 'Date of Birth', value: additionalDetails?.dateOfBirth },
    { label: 'About', value: additionalDetails?.about },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
      {fields.map(({ label, value }) => (
        <DetailField key={label} label={label} value={value} />
      ))}
    </div>
  );
};

export default Detailsgrid;
