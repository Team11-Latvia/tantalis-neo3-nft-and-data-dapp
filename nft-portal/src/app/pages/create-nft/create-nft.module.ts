import { ThirdStepComponent } from './components/third-step/third-step.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CreateNftRoutingModule } from './create-nft-routing.module';
import { CreateNftComponent } from './create-nft.component';

@NgModule({
  imports: [
    SharedModule,
    CreateNftRoutingModule
  ],
  declarations: [
    CreateNftComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent
  ],
  providers: [],
})
export class CreateNftModule { }
