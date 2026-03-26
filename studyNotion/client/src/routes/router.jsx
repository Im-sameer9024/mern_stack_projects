import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//-------------------------- Layouts-------------------------

import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import MainLayout from '@/layouts/MainLayout';

//-------------------------- Pages-------------------------

import OpenRoute from '@/components/common/OpenRoute';
import PageNotFound from '@/components/common/PageNotFound';
import EmailVerifyPage from '@/features/Auth/pages/EmailVerifyPage';
import ForgotPassword from '@/features/Auth/pages/ForgotPasswordPage';
import LoginPage from '@/features/Auth/pages/LoginPage';
import ResetPasswordPage from '@/features/Auth/pages/ResetPasswordPage';
import SignupPage from '@/features/Auth/pages/SignupPage';
import App from '@/App';
import PrivateRoute from '@/components/common/PrivateRoute';
import CartPage from '@/features/Cart/pages/CartPage';
import MyProfile from '@/features/Dashboard/Profile/pages/MyProfile';
import Setting from '@/features/Dashboard/Setting/pages/Setting';
import EnrolledCourses from '@/features/Dashboard/EnrolledCourses/pages/EnrolledCourses';
import AddCoursePage from '@/features/Dashboard/AddCourse/pages/AddCoursePage';
import TeacherRoute from '@/components/common/TeacherRoute';
import MyCourses from '@/features/Dashboard/MyCourses/pages/MyCourses';
import CategoryCourses from '@/features/Category/pages/CategoryCourses';
import CourseDetail from '@/features/Course/pages/CourseDetail';

const HomePage = lazy(() => import('@/features/Home/pages/HomePage'));
const AboutPage = lazy(() => import('@/features/About/pages/AboutPage'));
const ContactPage = lazy(() => import('@/features/Contact/pages/ContactPage'));
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      //-------------------- Main layout --------------------------
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/about',
            element: <AboutPage />,
          },
          {
            path: '/contact',
            element: <ContactPage />,
          },
          {
            path: '/cart',
            element: <CartPage />,
          },
          {
            path: '/category/:categoryId',
            element: <CategoryCourses />,
          },
          {
            path: '/course/:courseId',
            element: <CourseDetail />,
          },
        ],
      },

      //---------------------Auth layout --------------------------
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
            path: '/verify-email',
            element: (
              <OpenRoute>
                <EmailVerifyPage />
              </OpenRoute>
            ),
          },
          {
            path: '/forgot-password',
            element: (
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            ),
          },
          {
            path: '/update-password/:token',
            element: (
              <OpenRoute>
                <ResetPasswordPage />
              </OpenRoute>
            ),
          },
        ],
      },

      //------------------------dashboard layout-------------------------
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard/my-profile',
            element: (
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            ),
          },
          {
            path: '/dashboard/settings',
            element: (
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            ),
          },
          {
            path: '/dashboard/enrolled-courses',
            element: (
              <PrivateRoute>
                <EnrolledCourses />
              </PrivateRoute>
            ),
          },
          {
            path: '/dashboard/add-course',
            element: (
              <PrivateRoute>
                <TeacherRoute>
                  <AddCoursePage />
                </TeacherRoute>
              </PrivateRoute>
            ),
          },
          {
            path: '/dashboard/my-courses',
            element: (
              <PrivateRoute>
                <TeacherRoute>
                  <MyCourses />
                </TeacherRoute>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);
