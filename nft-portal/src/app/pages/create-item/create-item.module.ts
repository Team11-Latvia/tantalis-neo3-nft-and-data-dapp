import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CreateItemRoutingModule } from './create-item-routing.module';
import { CreateItemComponent } from './create-item.component';

@NgModule({
  imports: [
    SharedModule,
    CreateItemRoutingModule
  ],
  declarations: [
    CreateItemComponent
  ],
  providers: [],
})
export class CreateItemModule { }
