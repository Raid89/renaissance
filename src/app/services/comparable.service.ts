import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createComparableRequest , searchComparableRequest ,deleteComparableRequest ,updateComparableRequest } from '../interfaces/comparable';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComparableService {
  token = sessionStorage.getItem('accessToken');

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token || "",        
    })
  };

  createComparable(createComparableRequest: createComparableRequest): Observable<any> {
    return this.http.post(environment.url, createComparableRequest, this.httpOptions)
  }

  deleteComparable(deleteComparableRequest : deleteComparableRequest ): Observable<any> {
    return this.http.post(environment.url,deleteComparableRequest , this.httpOptions)
  }

  updateComparable(updateComparableRequest : updateComparableRequest  ): Observable<any> {
    return this.http.post(environment.url, updateComparableRequest  , this.httpOptions)
  }

  searchComparable(searchComparableRequest : searchComparableRequest): Observable<any> {
    return this.http.post(environment.url, searchComparableRequest, this.httpOptions)
  }


}
