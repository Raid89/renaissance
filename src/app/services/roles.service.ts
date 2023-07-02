import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { rolesRequest, rolesListRequest, rolesUpdateRequest, rolesDeleteRequest, permissionsListRequest } from '../interfaces/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
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

  createRole(rolesRequest: rolesRequest): Observable<any> {
    return this.http.post(environment.url, rolesRequest, this.httpOptions)
  }

  getRole(rolesListRequest: rolesListRequest): Observable<any> {
    return this.http.post(environment.url, rolesListRequest, this.httpOptions)
  }

  updateRole(rolesUpdateRequest: rolesUpdateRequest): Observable<any> {
    return this.http.post(environment.url, rolesUpdateRequest, this.httpOptions)
  }

  deleteRole(rolesDeleteRequest: rolesDeleteRequest): Observable<any> {
    return this.http.post(environment.url, rolesDeleteRequest, this.httpOptions)
  }

  getPermissions(permissionsListRequest: permissionsListRequest): Observable<any> {
    return this.http.post(environment.url, permissionsListRequest, this.httpOptions)
  }


}
