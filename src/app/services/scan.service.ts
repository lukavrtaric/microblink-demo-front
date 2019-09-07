import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import MRTD from "./../models/MRTD";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  baseUri = environment.backendAPIUrl + '/api/mongo';

  constructor(private http: HttpClient) { }

  create = (scan: MRTD): Observable<MRTD> => {
      return this
        .http
        .post<MRTD>(`${this.baseUri}/create`, scan);
  }

  getAll = (): Observable<MRTD[]> => {
    return this
      .http
      .get<MRTD[]>(`${this.baseUri}`);
  }

  get = (id: string): Observable<MRTD> => {
    return this
      .http
      .get<MRTD>(`${this.baseUri}/details/${id}`);
  }

  delete = (id: string): Observable<MRTD> => {
    return this
      .http
      .get<MRTD>(`${this.baseUri}/delete/${id}`);
  }
}
