import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/_models/order-item.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  customerId: number;
  salepointId: number;
  orders$: Observable<Order[]>;
  constructor(private orderService: OrderService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.customerId = this.localStorage.getUser().id;
    this.salepointId = this.localStorage.getSalepointId();
    console.log('sp id: ' + this.salepointId);

    this.orders$ = this.orderService.getOrdersByCustomer(this.customerId);
  }

  editOrder(order) {
    console.log(order);
    // temp object
    let orderItem = new OrderItem();
    let tempOrder = new Order();
    tempOrder.id = order.id;
    tempOrder.orderAmount = order.orderAmount;

    // to make orderItem compatible
    order.orderItems.forEach(element => {
      orderItem.item = element.item;
      orderItem.quantity = element.quantity;
      tempOrder.orderItems.push(orderItem);
      orderItem = new OrderItem();
    });
    this.localStorage.setEditOrderStatus('edit');
    this.orderService.order.next(tempOrder);
    this.router.navigateByUrl(`customer/${this.customerId}/salepoint/${this.salepointId}`);
  }

  addOrder(){
    this.orderService.order.next(new Order());
  }
}
