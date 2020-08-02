import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  riderId: number;
  orders$: Observable<Order[]>;
  constructor(private orderService: OrderService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.riderId = this.localStorage.getUser().id;
    console.log('rider id: ' + this.riderId);

    this.orders$ = this.orderService.getOrdersByRider(this.riderId);
    this.orderService.getOrdersByRider(this.riderId).subscribe((orders) => console.log(orders));
  }

}
