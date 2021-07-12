import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectMethodComponent } from './select-method.component';

const routes: Routes = [
  { path: '', component: SelectMethodComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectMethodRoutingModule { }
