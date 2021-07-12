import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { SelectMethodRoutingModule } from './select-method-routing.module';
import { SelectMethodComponent } from './select-method.component';

@NgModule({
  imports: [
    SharedModule,
    SelectMethodRoutingModule
  ],
  declarations: [
    SelectMethodComponent
  ],
  providers: [],
})
export class SelectMethodModule { }
