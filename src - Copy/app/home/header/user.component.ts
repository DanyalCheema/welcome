import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserDetail } from 'src/app/_models/user-detail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="salepoint-toolbar-button"
      [matMenuTriggerFor]="menu"
    >
      <img class="salepoint-avatar" src="../../assets/img/avatar.jpg" width="32" alt="avatar" />
      <span class="salepoint-username" fxHide.lt-sm>{{user.username}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Profile</span>
      </a>
      <a routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
      <a mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </a>
    </mat-menu>
  `,
  styles: [`
  .salepoint-username {
    margin: 0 8px;
    font-size: 14px;
  }
  .salepoint-toolbar-button.mat-button {
    min-width: unset;
    line-height: 40px;
    border-radius: 999px;
    padding: 0 4px;
  }
  .salepoint-avatar {
    border-radius: 999px;
  }
  `]
})
export class UserComponent implements OnInit {
  user: any;
  username: string;
  isLoggedIn = false;

  constructor(private localStorage: LocalStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.localStorage.getUser();
  }

  logout() {
    // flashout the local storage
    this.localStorage.signOut();

    // notify all subscribers to receive userDetail to update navbar
    // payload: user = null, isLoggedIn = false
    this.authService.userDetail.next(new UserDetail(null, false));
    this.router.navigate(['/login']);
  }
}
