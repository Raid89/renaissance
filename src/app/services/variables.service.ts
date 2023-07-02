import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { varsRequest, varsListRequest, varsUpdateRequest, varsDeleteRequest, varsTypesRequest } from '../interfaces/varsTemplate';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

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

  createVars(varsRequest: varsRequest): Observable<any> {
    return this.http.post(environment.url, varsRequest, this.httpOptions)
  }

  getListVars(varsListRequest: varsListRequest): Observable<any> {
    return this.http.post(environment.url, varsListRequest, this.httpOptions)
  }

  updateVars(varsUpdateRequest: varsUpdateRequest): Observable<any> {
    return this.http.post(environment.url, varsUpdateRequest, this.httpOptions)
  }

  deleteVars(varsDeleteRequest: varsDeleteRequest): Observable<any> {
    return this.http.post(environment.url, varsDeleteRequest, this.httpOptions)
  }

  getVarsType(varsTypesRequest: varsTypesRequest): Observable<any> {
    return this.http.post(environment.url, varsTypesRequest, this.httpOptions)
  }
}
