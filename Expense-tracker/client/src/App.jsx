import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CustomSpinner from './shared/components/custom/CustomSpinner';
import AuthChecker from './shared/utils/AuthChecker';

const App = () => {
  return (
    <>
      <AuthChecker />

      <Suspense fallback={<CustomSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
