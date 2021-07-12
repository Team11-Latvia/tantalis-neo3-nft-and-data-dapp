import { MatDialog } from '@angular/material/dialog';
import { CheckoutModalComponent } from './../../shared/modals/checkout-modal/checkout-modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  panelOpenState = false;
  favorite = false;

  constructor(
    private readonly matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  test() {
    this.panelOpenState = !this.panelOpenState;
  }

  public openCheckoutDialog(): void {
    this.matDialog.open(CheckoutModalComponent, {
      data: {
        animal: 'panda'
      },
      width: "700px",
      maxWidth: "90vw"
    });
  }
}
