import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PaymentSettings2RoutingModule } from './payment-settings2-routing.module';
import { PaymentSettings2Component } from './payment-settings2.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentSettings2RoutingModule
  ],
  declarations: [
    PaymentSettings2Component
  ],
  providers: [],
})
export class PaymentSettings2Module { }
