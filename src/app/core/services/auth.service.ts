import { Injectable } from '@angular/core';
import { SpinnerToasterService } from './spinner-toaster.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private spinnerToasterService: SpinnerToasterService,
    private router: Router
  ) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('token', 'dummy-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
    this.spinnerToasterService.showSpinner();
    this.spinnerToasterService.showToaster("success", "تم تسجيل الخروج بنجاح");
    this.spinnerToasterService.hideSpinner();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getFullName(): string {
    return localStorage.getItem('fullName')!;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
