import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { userDeleteRequest, userListRequest, userRequest, userUpdateRequest, updatePasswordRequest } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = sessionStorage.getItem('accessToken');

  constructor(
    private http: HttpClient,
    ) { }    

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token || "",
    })
  };

  createUser(userRequest: userRequest): Observable<any> {
    return this.http.post(environment.url, userRequest, this.httpOptions);
  }

  updateUser(userUpdateRequest: userUpdateRequest): Observable<any> {
    return this.http.post(environment.url, userUpdateRequest, this.httpOptions);
  }

  deleteUser(userDeleteRequest: userDeleteRequest): Observable<any> {
    return this.http.post(environment.url, userDeleteRequest, this.httpOptions);
  }

  getUsers(userListRequest: userListRequest): Observable<any> {
    return this.http.post(environment.url, userListRequest, this.httpOptions);
  }

  updatePassword(updatePasswordRequest: updatePasswordRequest): Observable<any> {
    return this.http.post(environment.url, updatePasswordRequest, this.httpOptions);
  }

}
