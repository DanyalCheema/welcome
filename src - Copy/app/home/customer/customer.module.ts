import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { CustomerComponent } from './customer.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RatingComponent } from './orders/rating/rating.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { ItemListComponent } from './orders/new-order/salepoint/item-list/item-list.component';
import { SalepointComponent } from './orders/new-order/salepoint/salepoint.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SalepointListComponent } from './salepoint-list/salepoint-list.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { OrderDetailComponent } from './orders/new-order/order-detail/order-detail.component';


@NgModule({
  declarations: [
    CustomerComponent,
    OrderListComponent,
    RatingComponent,
    NewOrderComponent,
    ItemListComponent,
    SalepointComponent,
    SearchBoxComponent,
    SalepointListComponent,
    MapDialogComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CustomerRoutingModule
  ],
  entryComponents: [MapDialogComponent]
})
export class CustomerModule { }
