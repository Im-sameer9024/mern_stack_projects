import React from 'react';
import { Bars } from 'react-loader-spinner';
import { useRouteLoading } from '@/shared/utils/useRouteLoading';
import { useLoaderStore } from '@/app/store/loaderStore';

const GlobalLoader = () => {
  const { loading } = useLoaderStore();
  const routeLoading = useRouteLoading();

  // 🔥 show loader if ANY loading is happening
  if (!loading && !routeLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="p-4 rounded-2xl bg-white shadow-xl flex flex-col items-center gap-3">
        <Bars height="50" width="50" color="#4fa94d" ariaLabel="global-loading" visible={true} />
        <p className="text-sm text-gray-600 font-medium">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
