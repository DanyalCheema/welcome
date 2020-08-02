import { Injectable } from '@angular/core';
import { CUSTOMER_URL } from '../_helpers/configurationApi';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const BASE_URL = CUSTOMER_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


}
