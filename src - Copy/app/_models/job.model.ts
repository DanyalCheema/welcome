import { SalePoint } from './salepoints.model';

export class Job {
    id: number;
    title: string;
    salary: number;
    createdAt: string;
    expireAt: string;
    experience: number;
    imageUrl: string;
    description: string;
    designation: string;
    salePoint: SalePoint
    isActive: string;
    modifiedBy: string;
    modifiedWhen: string;
    modifiedWorkstation: string;
}