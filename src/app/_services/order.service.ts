import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Order } from '../_models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ORDER_URL } from '../_helpers/configurationApi';
import { map } from 'rxjs/operators';

const BASE_URL = ORDER_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order = new BehaviorSubject<Order>(new Order());

  constructor(private http: HttpClient) { }

  getOrdersBySalepoint(salepointId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${BASE_URL}/salepoint/${salepointId}`);
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${BASE_URL}/customer/${customerId}`).pipe(
      map((orders: Order[]) => {
        return orders.reverse();
         }
      )
    );
  }

  getOrdersByRider(riderId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${BASE_URL}/employee/${riderId}`).pipe(
      map((orders: Order[]) => {
        return orders.reverse();
         }
      )
    );
  }

  sendFeedback(orderId: number, selectedStars: number) {
    return this.http.put(`${BASE_URL}/${orderId}/rating`, selectedStars);
  }

  addOrder(salePointId: number, customerId: number, order: any) {
    return this.http.post(`${BASE_URL}/add/${salePointId}/${customerId}`, order);
  }

  editOrder(orderId: number, order: any) {
    return this.http.put(`${BASE_URL}/edit/${orderId}`, order);
  }
}
