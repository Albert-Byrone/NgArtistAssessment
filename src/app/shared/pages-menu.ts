import { signal } from '@angular/core';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'dashboard',
    label: 'Home',
    route: 'dashboard',
  },
  {
    icon: 'video_library',
    label: 'Order History',
    route: 'order-history/:id',
  },
  {
    icon: 'logout',
    label: 'Logout',
  },
  {
    icon: 'login',
    label: 'Login',
  },
];
