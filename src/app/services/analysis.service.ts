import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {createAnalysis} from "../interfaces/varsAnalysis"
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

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



  postAnalysis(createAnalysis: createAnalysis): Observable<any> {
    return this.http.post(environment.url, createAnalysis, this.httpOptions)
  }

  
}