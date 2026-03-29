import React from 'react';
import { Spinner } from '../ui/spinner';

const CustomSpinner = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="p-4 rounded-2xl bg-white shadow-xl flex  items-center gap-3">
        <Spinner />
        Loading...
      </div>
    </div>
  );
};

export default CustomSpinner;
