import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { loginRequestDemo } from '../interfaces/login';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE, PATCH, TRACE, HEAD',
      'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };


  /* Method POST for user login */

  loginUser(loginRequest: loginRequestDemo): Observable<any> {
    return this.http.post(environment.url, loginRequest)
      .pipe(
        map((response) => {
          return response;
        }));
  }

  checkTokenExpiration(): void {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      const tokenData = JSON.parse(window.atob(token.split('.')[1]));
      const tokenExpiration = tokenData.exp * 1000;
      const currentTime = new Date().getTime();
      if (currentTime >= tokenExpiration) {
        setTimeout(() => {
          this.logout();
        }, 1000);
      }
    }
  }

  getUser(){
    const token = sessionStorage.getItem('accessToken');
    let user: string;
    if (token) {
      const tokenData = JSON.parse(window.atob(token.split('.')[1]));
      user = tokenData.user;
      return user
    } else {
      return null
    }    
  }


  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}