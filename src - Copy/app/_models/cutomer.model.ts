export class Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    cnic: string;
    personType: string;
    registeredAt: string;
    confirmedAt: string;
    isActive: string;
    constructor(customerId?: number){
        this.id = customerId;
    }
}
