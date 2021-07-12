import { TextModalComponent } from './modals/text-modal/text-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material.module';
import { WalletComponent } from './components/wallet/wallet.component';
import { CheckoutModalComponent } from './modals/checkout-modal/checkout-modal.component';
import { PlaceBidModalComponent } from './modals/place-bid-modal/place-bid-modal.component';
import { SignUpModalComponent } from './modals/sign-up-modal/sign-up-modal.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  declarations: [
    WalletComponent,
    SignUpModalComponent,
    CheckoutModalComponent,
    PlaceBidModalComponent,
    TextModalComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    WalletComponent,
    ClipboardModule,
    SignUpModalComponent,
    CheckoutModalComponent,
    PlaceBidModalComponent,
    TextModalComponent
  ],
  providers: []
})
export class SharedModule { }
