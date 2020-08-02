import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LocalStorageService } from '../_services/local-storage.service';
import { Router } from '@angular/router';
import { UserDetail } from '../_models/user-detail.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  userDetail: UserDetail = new UserDetail();

  isCustomer = false;
  isRider = false;

  private subscription: Subscription;

  constructor(private authService: AuthService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.authService.userDetail.subscribe(
      (status: UserDetail) => {

        this.isLoggedIn = status.isLoggedIn;
        if (this.isLoggedIn) {
          const user = status.user;
          this.roles = user.roles;
        } else {
          console.log('Failure event Alert from login.commponent');
          // reset form
          this.clearForm();
        }
      }
    );
  }

  onSubmit() {
    this.subscription = this.authService.login(this.form).subscribe(
      data => {
        this.localStorage.saveToken(data.accessToken);
        console.log(data);

        this.localStorage.saveUser(data);
        this.roles = this.localStorage.getUser().roles;
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.userDetail.isLoggedIn = true;
        this.userDetail.user = this.localStorage.getUser();
        this.isCustomer = this.roles.includes('ROLE_CUSTOMER');
        this.isRider = this.roles.includes('ROLE_DELIVERY_PERSON');

        // intimate subscriber to receive userDetail to update navbar
        this.authService.userDetail.next(this.userDetail);

        if (this.isCustomer) {

          this.router.navigate(['/customer', this.localStorage.getUser().id]);

        } else if (this.isRider) {

          this.router.navigate(['/rider']);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  signUp() {
    this.router.navigate(['/register']);
  }
  clearForm() {
    this.form = [];
  }

  ngOnDestroy() {
    if (this.isLoggedIn) {
      this.subscription.unsubscribe();
    }
  }
}
