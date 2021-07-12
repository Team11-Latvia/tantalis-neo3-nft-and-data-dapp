import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';

@NgModule({
  imports: [
    SharedModule,
    CollectionRoutingModule
  ],
  declarations: [
    CollectionComponent
  ],
  providers: [],
})
export class CollectionModule { }
