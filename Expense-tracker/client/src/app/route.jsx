/* eslint-disable react-refresh/only-export-components */
import App from '@/App';
import LoginPage from '@/features/Auth/pages/LoginPage';
import SignupPage from '@/features/Auth/pages/SignupPage';

import AuthLayout from '@/features/layouts/AuthLayout';
import MainLayout from '@/features/layouts/MainLayout';
import Root from '@/features/Root';
import OpenRoute from '@/shared/components/common/OpenRoute';
import PrivateRoute from '@/shared/components/common/PrivateRoute';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//-------------------- lazy components ------------------------

const DashboardPage = lazy(() => import('@/features/Dashboard/pages/DashboardPage'));
const IncomePage = lazy(() => import('@/features/Income/pages/IncomePage'));
const ExpensePage = lazy(() => import('@/features/Expense/pages/ExpensePage'));

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // ---------------- Auth Layout ----------------------
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: (
              <OpenRoute>
                <LoginPage />
              </OpenRoute>
            ),
          },
          {
            path: '/signup',
            element: (
              <OpenRoute>
                <SignupPage />
              </OpenRoute>
            ),
          },
        ],
      },

      //--------------------- Main Layout ---------------------
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: (
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            ),
          },
          {
            path: '/expenses',
            element: (
              <PrivateRoute>
                <ExpensePage />
              </PrivateRoute>
            ),
          },
          {
            path: '/incomes',
            element: (
              <PrivateRoute>
                <IncomePage />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: '/',
        element: <Root />,
      },
    ],
  },
]);
