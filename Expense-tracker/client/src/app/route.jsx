/* eslint-disable react-refresh/only-export-components */
import App from '@/App';
import ForgotPasswordPage from '@/features/Auth/pages/ForgotPasswordPage';
import LoginPage from '@/features/Auth/pages/LoginPage';
import ResetPasswordPage from '@/features/Auth/pages/ResetPasswordPage';
import SignupPage from '@/features/Auth/pages/SignupPage';

import AuthLayout from '@/features/layouts/AuthLayout';
import MainLayout from '@/features/layouts/MainLayout';
import Root from '@/features/Root';
import SettingsPage from '@/features/Settings/pages/SettingsPage';
import OpenRoute from '@/shared/components/common/OpenRoute';
import PrivateRoute from '@/shared/components/common/PrivateRoute';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//-------------------- lazy components ------------------------

const DashboardPage = lazy(() => import('@/features/Dashboard/pages/DashboardPage'));
const IncomePage = lazy(() => import('@/features/Income/pages/IncomePage'));
const ExpensePage = lazy(() => import('@/features/Expense/pages/ExpensePage'));
const TransactionsPage = lazy(() => import('@/features/Transactions/pages/TransactionsPage'));

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
          {
            path: '/forgot-password',
            element: (
              <OpenRoute>
                <ForgotPasswordPage />
              </OpenRoute>
            ),
          },
          {
            path: '/reset-password-token/:token',
            element: (
              <OpenRoute>
                <ResetPasswordPage />
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
          {
            path: '/settings',
            element: (
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            ),
          },
          {
            path: '/transactions',
            element: (
              <PrivateRoute>
                <TransactionsPage />
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
