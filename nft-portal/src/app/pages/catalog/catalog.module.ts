import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

@NgModule({
  imports: [
    SharedModule,
    CatalogRoutingModule
  ],
  declarations: [
    CatalogComponent
  ],
  providers: [],
})
export class CatalogModule { }
