import { Component, inject } from '@angular/core';
import { authenticationGuard } from './auth/services/authentication.guard';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MENU_ITEMS } from './shared/pages-menu';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-artists-assignment';

  currentUser = inject(AuthService);

  constructor(public authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    if (this.currentUser.authStatus$['_value']['meta']['LoginStatus']) {
      return true;
    }
    return false;
  }
}
