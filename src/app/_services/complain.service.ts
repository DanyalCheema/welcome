import { Injectable } from '@angular/core';
import { COMPLAIN_URL } from '../_helpers/configurationApi';
import { HttpClient } from '@angular/common/http';
import { Complain } from '../_models/complain.model';

const BASE_URL = COMPLAIN_URL;

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(private http: HttpClient) { }


  addComplain(complain:Complain) {
    console.log(complain);
    console.log(JSON.stringify(complain));
    this.http.post<Complain>(`${BASE_URL}/add`, complain).subscribe();
    
    // console.log(this.http.get<Complain>(`${BASE_URL}`).subscribe());


  }


}
