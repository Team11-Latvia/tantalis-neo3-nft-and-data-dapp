import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PaymentSettings1RoutingModule } from './payment-settings1-routing.module';
import { PaymentSettings1Component } from './payment-settings1.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentSettings1RoutingModule
  ],
  declarations: [
    PaymentSettings1Component
  ],
  providers: [],
})
export class PaymentSettings1Module { }
