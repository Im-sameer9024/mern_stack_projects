import { HandCoins, LayoutDashboard, LogOut, WalletMinimal, ScrollText, Settings } from 'lucide-react';

export const SidebarLinks = [
  {
    id: 1,
    icon: <LayoutDashboard />,
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    id: 2,
    icon: <ScrollText />,
    text: 'Transactions',
    link: '/transactions',
  },

  {
    id: 3,
    icon: <WalletMinimal />,
    text: 'Income',
    link: '/incomes',
  },
  {
    id: 4,
    icon: <HandCoins />,
    text: 'Expenses',
    link: '/expenses',
  },
  {
    id: 5,
    icon: <Settings />,
    text: 'Settings',
    link: '/settings',
  },
  {
    id: 6,
    icon: <LogOut />,
    text: 'Logout',
    link: '/logout',
  },
];
