import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { Routes, RouterModule } from '@angular/router';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { SalepointListComponent } from './salepoint-list/salepoint-list.component';
import { SalepointComponent } from './orders/new-order/salepoint/salepoint.component';
import { OrderDetailComponent } from './orders/new-order/order-detail/order-detail.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { ComplainComponent } from './complain/complain.component';

const customerRoutes: Routes = [

    {
        path: '',
        children: [
            // default route
            {
                path: '', component: CustomerComponent,
                children: [
                    // { path: 'salepoints/:address', component: SalepointListComponent },
                ]
            },
        ]
    },
    { path: 'salepoints/:address', component: SalepointListComponent },
    { path: 'salepoint/:salepointId', component: SalepointComponent },
    { path: 'salepoint/:salepointId/complain', component: ComplainComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'orders/new', component: NewOrderComponent },
    { path: 'order/detail', component: OrderDetailComponent },
    { path: 'jobAdd', component: JobAddComponent }

];

@NgModule({
    imports: [
        RouterModule.forChild(customerRoutes)
    ],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
