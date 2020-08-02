import { Address } from './address.model';

export class SalePoint {
    id: number;
    name: string;
    deliveryAreaDistance: number;
    registeredAt: string;
    confirmedAt: string;
    ranking: number;
    photo: string;
    description: string;
    salePointOwner: number;
    isActive: CharacterData;
    modifiedBy: string;
    modifiedWhen: string;
    modifiedWorkStation: string;
    address: Address;
    constructor(salepointId?: number){
        this.id = salepointId;
    }
}

