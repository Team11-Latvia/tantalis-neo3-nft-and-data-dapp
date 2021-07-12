import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { NFTCardRoutingModule } from './nftcard-routing.module';
import { NFTCardComponent } from './nftcard.component';

@NgModule({
  imports: [
    SharedModule,
    NFTCardRoutingModule
  ],
  declarations: [
    NFTCardComponent
  ],
  providers: [],
})
export class NFTCardModule { }
