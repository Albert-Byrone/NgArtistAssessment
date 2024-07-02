import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatusSubject.asObservable();

  setLoginStatus(status: boolean) {
    this.loginStatusSubject.next(status);
  }
}
