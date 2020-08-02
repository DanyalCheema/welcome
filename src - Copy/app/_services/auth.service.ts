import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserDetail } from '../_models/user-detail.model';
import { LocalStorageService } from './local-storage.service';
import { AUTH_URL } from '../_helpers/configurationApi';

const BASE_URL = AUTH_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetail = new Subject<UserDetail>();

  constructor(private http: HttpClient, private tokenStorageService: LocalStorageService) {}

  login(credentials): Observable<any> {
    return this.http.post(`${BASE_URL}/signin`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  isLoggedIn() {
    if (!!this.tokenStorageService.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getRole(){
    return this.tokenStorageService.getUser().roles[0];
  }
}
