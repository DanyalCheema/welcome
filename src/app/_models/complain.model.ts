import { Time } from '@angular/common';
import { SalePoint } from './salepoints.model';
import { Customer } from './cutomer.model';

export class Complain {
    subject:string;
    createdAt:Time;
    description:string;
    salePointId:number;
    customerId:number;
}