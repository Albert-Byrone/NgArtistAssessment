import { signal } from '@angular/core';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'person',
    label: 'Home',
    route: 'dashboard',
  },
  {
    icon: 'list_alt',
    label: 'Order History',
    route: 'order-history/:id',
  },
  {
    icon: 'backspace',
    label: 'Logout',
  },
  {
    icon: 'login',
    label: 'Login',
  },
];
