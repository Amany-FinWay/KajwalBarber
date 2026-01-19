import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerToasterService } from '../../core/services/spinner-toaster.service';
import { SuccessfulLogin } from '../../core/models/login.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private spinnerToasterService: SpinnerToasterService
  ) {}

  login() {
    this.spinnerToasterService.showSpinner();
    this.loginService.Login({email: this.username, password: this.password}).subscribe({
      next: (res: SuccessfulLogin) => {
        this.spinnerToasterService.hideSpinner();
        this.spinnerToasterService.showToaster("success", "تم تسجيل الدخول بنجاح");
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('fullName', res.data.fullName);
        this.router.navigate(['/dashboard']);
      }, error: (err) => {
        this.spinnerToasterService.hideSpinner();
        this.spinnerToasterService.showToaster("error", "فشل تسجيل الدخول, تأكد من صحة البيانات المدخلة");        
      }
    })
  }
}
