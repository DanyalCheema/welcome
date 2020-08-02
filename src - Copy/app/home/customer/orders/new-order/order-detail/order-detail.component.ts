import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order.model';
import { OrderItem } from 'src/app/_models/order-item.model';
import { OrderService } from 'src/app/_services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SalepointService } from 'src/app/_services/salepoint.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  orderItems: OrderItem[] = [];
  salepointName;
  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute,
    private salepointService: SalepointService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.orderService.order.subscribe((orderRes: Order) => {
      this.order = orderRes;
      this.order.orderAmountUpdate();
    });
    this.salepointService.salepoint.subscribe(sp => this.salepointName = sp.name);
  }
  checkout() {
    // create temporary DTO objects
    let itemList: any[] = [];
    this.order.orderItems.forEach(element => {
      let ItemDto = {
        id: element.item.id,
        quantity: element.getQuantity()
      };
      itemList.push(ItemDto);
    });

    let orderDto = {
      id: this.order.id,
      itemDtoList: itemList,
      address: this.order.address,
      placedAt: this.order.placedAt,
      isActive: this.order.isActive,
      modifiedBy: this.order.modifiedBy,
      modifiedWhen: this.order.modifiedWhen,
      modifiedWorkstation: this.order.modifiedWorkstation
    };

    if (this.localStorage.getEditOrderStatus() === 'edit') {
      console.log('edit function called');
      console.log(orderDto);
      this.orderService.editOrder(this.order.id, orderDto).subscribe(
        () => {
          this.localStorage.setEditOrderStatus('add');
          this.orderService.order.next(new Order());
          this.router.navigateByUrl(`/customer/${this.order.customer.id}/orders`);
        }
      );
    } else {
      console.log('add function called');
      this.orderService.addOrder(this.order.salePoint.id, this.order.customer.id, orderDto).subscribe(
        () => {
          this.orderService.order.next(new Order());
          this.router.navigateByUrl(`/customer/${this.order.customer.id}/orders`);
        }
      );
    }
  }

  updateOrder() {
    this.orderService.order.next(this.order);
  }
}
