import { Address } from './address.model';
import { Customer } from './cutomer.model';
import { SalePoint } from './salepoints.model';
import { OrderItem } from './order-item.model';

export class Order {
    id: number;
    placedAt: string;
    address: Address;
    customer: Customer;
    salePoint: SalePoint;
    rating: number;
    isActive: string;
    modifiedBy: string;
    modifiedWhen: string;
    modifiedWorkstation: string;
    orderItems: OrderItem[];
    orderAmount: number;
    constructor() {
        this.orderItems = [];
        this.orderAmount = 0;
        this.customer = new Customer();
        this.salePoint = new SalePoint();
        this.address = new Address();
        this.rating = 0;
    }
    orderAmountUpdate() {
        this.orderAmount = 0;
        this.orderItems.forEach(element => {
            this.orderAmount += element.item.itemPrice * element.getQuantity();
        });
    }

    getAmount() {
        return this.orderAmount;
    }

    removeItem(id) {
        let index = 0;
        this.orderItems.forEach(element => {
            if (element.item.id === id) {
                this.orderItems.splice(index, 1);
            }
            index++;
        });
    }
}
