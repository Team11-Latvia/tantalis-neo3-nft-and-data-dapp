import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNftComponent } from './create-nft.component';

const routes: Routes = [
  { path: '', component: CreateNftComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNftRoutingModule { }
