
import { HandCoins, LayoutDashboard, LogOut, WalletMinimal } from 'lucide-react';


export const SidebarLinks = [
  {
    id: 1,
    icon: <LayoutDashboard/>,
    text: 'Dashboard',
    link: '/dashboard',
  },

  {
    id: 2,
    icon: <WalletMinimal/> ,
    text: 'Income',
    link: '/incomes',
  },
  {
    id: 3,
    icon: <HandCoins/> ,
    text: 'Expenses',
    link: '/expenses',
  },
  {
    id: 4,
    icon: <LogOut/>,
    text: 'Logout',
    link: '/logout',
  },
];

