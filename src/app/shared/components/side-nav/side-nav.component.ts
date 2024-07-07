import { Component, inject, Input, signal } from '@angular/core';
import { MENU_ITEMS, MenuItem } from '../../pages-menu';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menu = MENU_ITEMS;

  currentUser = inject(AuthService);
  isLoading = false;
  constructor(public authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    if (this.currentUser.authStatus$['_value']['meta']['LoginStatus']) {
      return true;
    }
    return false;
  }

  getMenuItems(): MenuItem[] {
    if (this.isAuthenticated()) {
      return this.menu.filter((item) => item.label !== 'Login');
    } else {
      return this.menu.filter((item) => item.label === 'Login');
    }
  }

  ngOnInit(): void {
    // get the current user id and pass it to the order-history route
    const userId = this.currentUser?.initialAuthState?.data?.attributes?.owner;
    if (userId) {
      // console.log(this.currentUser?.initialAuthState?.data?.attributes?.owner);
      this.isLoading = false;
      this.menu = this.menu.map((item) => {
        if (item.route === 'order-history/:id') {
          return { ...item, route: `order-history/${userId}` };
        }
        return item;
      });
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next(data) {
        console.error('Logout successful', data);
      },
      error(error) {
        console.error('Logout failed', error);
      },
      complete() {
        console.error('Logout complete');
        this.router.navigate(['/login']);
      },
    });
  }
}
