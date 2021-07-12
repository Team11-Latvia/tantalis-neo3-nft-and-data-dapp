import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionVarComponent } from './collection-var.component';

const routes: Routes = [
  { path: '', component: CollectionVarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionVarRoutingModule { }
