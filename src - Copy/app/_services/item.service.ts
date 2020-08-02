import { Injectable } from '@angular/core';
import { SalepointItem } from '../_models/salepoint-item.model';
import { HttpClient } from '@angular/common/http';
import { ITEM_URL } from '../_helpers/configurationApi';

const BASE_URL = ITEM_URL;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  getItems(salepointId: number) { return this.http.get<SalepointItem[]>(BASE_URL + '/salepoints/' + salepointId); }

}
