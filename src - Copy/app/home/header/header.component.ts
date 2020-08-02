import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/_services/auth.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { OrderService } from 'src/app/_services/order.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  isActive = true;
  customerId: number;
  role: string;
  isRider = false;
  counter: number;
  editOrder = 'false';

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private storageService: LocalStorageService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.storageService.getUser().roles[0];
    if (this.role.includes('ROLE_DELIVERY_PERSON')) {
      this.isRider = true;
    } else if (this.role.includes('ROLE_CUSTOMER')) {
      this.customerId = this.storageService.getUser().id;

      this.orderService.order.subscribe(
        order => {
          this.counter = order.orderItems.length;
        }
      );
    }
  }

  backClicked() {
    this.location.back();
  }

  clickCart() {
    this.router.navigateByUrl(`/customer/${this.customerId}/order/detail`);
  }
}
