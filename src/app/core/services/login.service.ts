import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, SuccessfulLogin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) {}

  Login(login: Login): Observable<SuccessfulLogin> {
    return this.httpClient.post<SuccessfulLogin>('/api/auth/login', login);
  }
}
