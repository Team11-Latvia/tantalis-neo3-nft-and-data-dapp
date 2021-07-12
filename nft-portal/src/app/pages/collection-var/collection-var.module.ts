import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CollectionVarRoutingModule } from './collection-var-routing.module';
import { CollectionVarComponent } from './collection-var.component';

@NgModule({
  imports: [
    SharedModule,
    CollectionVarRoutingModule
  ],
  declarations: [
    CollectionVarComponent
  ],
  providers: [],
})
export class CollectionVarModule { }
