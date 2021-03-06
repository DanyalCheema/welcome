import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$
  //   .pipe(
  //     switchMap(user => this.userService.get(user.uid).valueChanges().pipe(
  //       map(appUser =>appUser.isAdmin)
  //     )));
  //  }
  canActivate(){
    return true
  }
}

