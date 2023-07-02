import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { documentsRequest, documentsDayRequest, templatesCreatedRequest } from '../interfaces/documents';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  
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

getDocuments(documentsRequest: documentsRequest): Observable<any> {
  return this.http.post(environment.url, documentsRequest, this.httpOptions)
}

getDocumentsDay(documentsDayRequest: documentsDayRequest): Observable<any> {
  return this.http.post(environment.url, documentsDayRequest, this.httpOptions)
}

getTemplatesCreated(templatesCreatedRequest: templatesCreatedRequest): Observable<any> {
  return this.http.post(environment.url, templatesCreatedRequest, this.httpOptions)
}

}
