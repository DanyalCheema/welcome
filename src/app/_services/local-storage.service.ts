import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveSalepointId(salepointId) {
    sessionStorage.setItem('salepoint-id', salepointId);
  }

  public getSalepointId() {
    return parseInt(sessionStorage.getItem('salepoint-id'));
  }

  public setEditOrderStatus(status) {
    sessionStorage.setItem('edit-order', status);
  }

  public getEditOrderStatus() {
    return sessionStorage.getItem('edit-order');
  }
}
