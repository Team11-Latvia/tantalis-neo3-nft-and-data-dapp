import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentSettings1Component } from './payment-settings1.component';

const routes: Routes = [
  { path: '', component: PaymentSettings1Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSettings1RoutingModule { }
