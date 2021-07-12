import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCollectionComponent } from './create-collection.component';

const routes: Routes = [
  { path: '', component: CreateCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCollectionRoutingModule { }
