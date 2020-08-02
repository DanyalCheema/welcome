import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { ItemService } from 'src/app/_services/item.service';
import { SalepointItem } from 'src/app/_models/salepoint-item.model';
import { Order } from 'src/app/_models/order.model';
import { OrderItem } from 'src/app/_models/order-item.model';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/_models/cutomer.model';
import { SalePoint } from 'src/app/_models/salepoints.model';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { element } from 'protractor';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  order: Order = new Order();
  orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const salepointId = parseInt(this.route.snapshot.paramMap.get('salepointId'));
    const customerId = parseInt(this.route.snapshot.paramMap.get('customerId'));

    this.itemService.getItems(salepointId).subscribe((items: SalepointItem[]) => {
      // temp object
      let orderItem = new OrderItem();
      // subscribe to order for added items
      this.orderService.order.subscribe(order => this.order = order);

      items.forEach(item => {
        orderItem.item = item;
        // assign the existing item in order to this.orderItems
        this.order.orderItems.forEach(preExistItem => {
          if (preExistItem.item.id === orderItem.item.id) {
            orderItem.quantity = preExistItem.quantity;
            // this line to update price when to edit the order
            preExistItem.item.itemPrice = orderItem.item.itemPrice;

          }
        });

        this.orderItems.push(orderItem);
        orderItem = new OrderItem();
      });

      // adding salepoint and customer refrence to the order object
      this.order.customer = new Customer(customerId);
      this.order.salePoint = new SalePoint(salepointId);
    });
  }
  addToCart(index) {
    this.orderItems[index].quantityInc();
    this.order.orderItems.push(this.orderItems[index]);
    this.orderService.order.next(this.order);
  }

  updateOrder(orderItem) {
    this.order.orderItems.forEach(elemnt => {
      if (elemnt.item.id === orderItem.item.id) {
        elemnt.quantity = orderItem.quantity;
      }
    });
    this.orderService.order.next(this.order);
  }

  removeItem(orderItem, index) {
    if (orderItem.getQuantity() < 0.5) {
      this.order.removeItem(orderItem.item.id);
      this.orderService.order.next(this.order);
    }
  }
}
