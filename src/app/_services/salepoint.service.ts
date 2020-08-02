import { Injectable } from '@angular/core';
import { SALEPOINT_URL } from '../_helpers/configurationApi';
import { SalePoint } from '../_models/salepoints.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const BASE_URL = SALEPOINT_URL;

@Injectable({
  providedIn: 'root'
})
export class SalepointService {

  salepoint = new BehaviorSubject<SalePoint>(new SalePoint());
  constructor(private http: HttpClient) { }

  getSalepointById(id: number): Observable<SalePoint> {
    return this.http.get<SalePoint>(`${BASE_URL}/${id}`);
  }

  getSalepointByAddress(city: string): Observable<SalePoint> {
    return this.http.get<SalePoint>(`${BASE_URL}/city/${city}`);
  }
}
