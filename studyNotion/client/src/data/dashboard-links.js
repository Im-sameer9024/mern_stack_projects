import { Roles } from './constants';

export const sidebarLinks = [
  {
    id: 1,
    name: 'My Profile',
    path: '/dashboard/my-profile',
    icon: 'VscAccount',
  },
  {
    id: 2,
    name: 'Dashboard',
    path: '/dashboard/instructor',
    type: Roles.TEACHER,
    icon: 'VscDashboard',
  },
  {
    id: 3,
    name: 'My Courses',
    path: '/dashboard/my-courses',
    type: Roles.TEACHER,
    icon: 'VscVm',
  },
  {
    id: 4,
    name: 'Add Course',
    path: '/dashboard/add-course',
    type: Roles.TEACHER,
    icon: 'VscAdd',
  },
  {
    id: 5,
    name: 'Enrolled Courses',
    path: '/dashboard/enrolled-courses',
    type: Roles.STUDENT,
    icon: 'VscMortarBoard',
  },
  {
    id: 6,
    name: 'Purchase History',
    path: '/dashboard/purchase-history',
    type: Roles.STUDENT,
    icon: 'VscHistory',
  },
];
