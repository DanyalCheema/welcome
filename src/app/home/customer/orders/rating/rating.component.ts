import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input('order-detail') order: Order;


  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    // this.selectedValue = 3;
    // this.rating.next(3);
    // this.countStar(3);
    console.log('befor roud: ' + this.order.rating);
    this.order.rating = Math.round(this.order.rating);
    console.log('after roud: ' + this.order.rating);

    // tslint:disable-next-line: triple-equals
    if (this.order.rating != 0) {
      this.selectedValue = this.order.rating;
      // console.log('selected value: ' + this.selectedValue.valueOf);

    }
  }

  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
  sendFeedback() {
    this.orderService.sendFeedback(this.order.id, this.selectedValue).subscribe(() => this.order.rating = this.selectedValue);
  }
}
