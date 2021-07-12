import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { SelectCreateCollectionRoutingModule } from './select-create-collection-routing.module';
import { SelectCreateCollectionComponent } from './select-create-collection.component';

@NgModule({
  imports: [
    SharedModule,
    SelectCreateCollectionRoutingModule
  ],
  declarations: [
    SelectCreateCollectionComponent
  ],
  providers: [],
})
export class SelectCreateCollectionModule { }
