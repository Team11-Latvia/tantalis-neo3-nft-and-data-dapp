import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PlaceBidRoutingModule } from './place-bid-routing.module';
import { PlaceBidComponent } from './place-bid.component';

@NgModule({
  imports: [
    SharedModule,
    PlaceBidRoutingModule
  ],
  declarations: [
    PlaceBidComponent
  ],
  providers: [],
})
export class PlaceBidModule { }
