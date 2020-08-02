import { SalePoint } from './salepoints.model';
import { Address } from './address.model';

export class Employee {
    //person:Person;
    id: number;
    name: String;
    email: String;
    phone: String;
    cnic: number;
    personType: number;
    address: Address;
    registeredAt: string;
    confirmedAt: string;
    isActive: CharacterData;
    modifiedBy: string;
    modifiedWhen: string;
    modifiedWorkStation: string;
    employeeCode: number;
    salePoint: SalePoint;
}


export enum PersonType {
    SALEPOINTOWNER,
    EMPLOYEE,
    CUSTOMER
}

export class Person {
    id: number;
    name: String;
    email: String;
    phone: String;
    cnic: number;
    personType: PersonType;
    address: Address;
    registeredAt: string;
    confirmedAt: string;
    isActive: CharacterData;
    modifiedBy: string;
    modifiedWhen: string;
    modifiedWorkStation: string;

}