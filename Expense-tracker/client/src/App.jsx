import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import GlobalLoader from './shared/components/custom/GlobalSpinner';
import { Spinner } from './shared/components/ui/spinner';
import CustomSpinner from './shared/components/custom/CustomSpinner';

const App = () => {
  return (
    <>
      <GlobalLoader />
      <Suspense fallback={<CustomSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
