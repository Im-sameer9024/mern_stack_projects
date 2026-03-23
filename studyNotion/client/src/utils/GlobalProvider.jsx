import { persistor, store } from '@/store/store';
import queryClient from './reactQuery';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthInitializer from './AuthInitializer';
import { router } from '@/routes/router';
import Spinner from '@/components/common/Spinner';

const GlobalProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AuthInitializer />
          <Toaster position="top-right" richColors closeButton />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default GlobalProvider;
