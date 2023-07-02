import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { pdfRequest } from '../interfaces/pdf';



@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

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

    savePdf(saveRequest: pdfRequest): Observable<any>{
      return this.http.post(environment.url, saveRequest, this.httpOptions)
    }  
}
