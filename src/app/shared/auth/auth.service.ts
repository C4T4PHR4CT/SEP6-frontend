import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://sep.nlevi.dev/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private userSubject: BehaviorSubject<User> | undefined;
  public user: Observable<User> | undefined;
  constructor(private http: HttpClient, public router: Router) {
    let user = localStorage.getItem('user');
    if (user) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(user));
      this.user = this.userSubject.asObservable();
    }
  }
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user);
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject?.next(user);
        this.router.navigate(['/home/' + res.user.username]);
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    this.http.post<any>(`${this.endpoint}/token/revoke`, {});
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('user');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  async confirmToken() {
    const token = localStorage.getItem('access_token');
    const response = await lastValueFrom(
      this.http.post<any>(`${this.endpoint}/token/confirm`, { token: token })
    );
    return response;
  }

  gettoken() {
    return !!localStorage.getItem('access_token');
  }
}
