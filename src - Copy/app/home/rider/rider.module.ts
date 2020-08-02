import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiderRoutingModule } from './rider-routing.module';
import { RiderComponent } from './rider.component';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    RiderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RiderRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class RiderModule { }
