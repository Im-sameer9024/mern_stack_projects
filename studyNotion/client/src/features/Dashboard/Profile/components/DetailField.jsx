import React from 'react';

const DetailField = ({ label, value, fallback = 'Not Added' }) => {
  return (
    <div>
      <p className="font-semibold text-richBlack-300">{label}</p>
      <p className="font-sm text-slate-500">{value || fallback}</p>
    </div>
  );
};

export default DetailField;
