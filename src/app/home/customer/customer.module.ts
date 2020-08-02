import { NgModule, ErrorHandler } from '@angular/core';
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
import { JobAddComponent } from './job-add/job-add.component';
import { AgmCoreModule } from '@agm/core';
import { DialogComponent } from './job-add/dialog/dialog.component';

import { ComplainComponent } from './complain/complain.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandlerService } from 'src/app/_services/global-error-handler.service';
import { AuthInterceptor } from 'src/app/_helpers/auth.interceptor';

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
    OrderDetailComponent,
    JobAddComponent,
    DialogComponent,
    ComplainComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWUW77f1C6fvmOQzpS9gzUeaIvMLGhtrE',
      libraries: ['places']
    })
  ],
  entryComponents: [MapDialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
})
export class CustomerModule { }
