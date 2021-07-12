import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCreateCollectionComponent } from './select-create-collection.component';

const routes: Routes = [
  { path: '', component: SelectCreateCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectCreateCollectionRoutingModule { }
