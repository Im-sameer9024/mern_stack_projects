import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from './components/common/Spinner';

const App = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
