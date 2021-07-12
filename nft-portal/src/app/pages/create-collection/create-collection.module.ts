import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CreateCollectionRoutingModule } from './create-collection-routing.module';
import { CreateCollectionComponent } from './create-collection.component';

@NgModule({
  imports: [
    SharedModule,
    CreateCollectionRoutingModule
  ],
  declarations: [
    CreateCollectionComponent
  ],
  providers: [],
})
export class CreateCollectionModule { }
