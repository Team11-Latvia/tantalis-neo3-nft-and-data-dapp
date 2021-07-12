import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';

@NgModule({
  imports: [
    SharedModule,
    BuyRoutingModule
  ],
  declarations: [
    BuyComponent
  ],
  providers: [],
})
export class BuyModule { }
