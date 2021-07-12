import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentSettings2Component } from './payment-settings2.component';

const routes: Routes = [
  { path: '', component: PaymentSettings2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSettings2RoutingModule { }
