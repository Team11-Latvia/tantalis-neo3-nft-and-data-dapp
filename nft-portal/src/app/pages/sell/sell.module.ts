import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { SellRoutingModule } from './sell-routing.module';
import { SellComponent } from './sell.component';

@NgModule({
  imports: [
    SharedModule,
    SellRoutingModule
  ],
  declarations: [
    SellComponent
  ],
  providers: [],
})
export class SellModule { }
