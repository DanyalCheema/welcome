import { SalepointItem } from './salepoint-item.model';

export class OrderItem {
    item: SalepointItem;
    quantity: number;
    remarks: string;

    constructor() {
        this.quantity = 0.0;
        this.item = new SalepointItem();
    }
    quantityInc() {
        this.quantity += .5;
    }
    quantityDec() {
        this.quantity -= .5;
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }

}
