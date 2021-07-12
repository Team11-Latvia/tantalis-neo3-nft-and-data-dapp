import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NFTCardComponent } from './nftcard.component';

const routes: Routes = [
  { path: '', component: NFTCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NFTCardRoutingModule { }
