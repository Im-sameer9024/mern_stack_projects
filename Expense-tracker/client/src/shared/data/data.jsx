import { MdDashboard } from 'react-icons/md';
import { FaWallet, FaHandHoldingUsd } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export const SidebarLinks = [
  {
    id: 1,
    icon: <MdDashboard />,
    text: 'Dashboard',
    link: '/dashboard',
  },

  {
    id: 2,
    icon: <FaWallet />,
    text: 'Income',
    link: '/incomes',
  },
  {
    id: 3,
    icon: <FaHandHoldingUsd />,
    text: 'Expenses',
    link: '/expenses',
  },
  {
    id: 4,
    icon: <FiLogOut />,
    text: 'Logout',
    link: '/logout',
  },
];
