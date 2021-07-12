import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceBidModalComponent } from 'src/app/shared/modals/place-bid-modal/place-bid-modal.component';

@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.scss']
})
export class PlaceBidComponent implements OnInit {
  panelOpenState = false;
  favorite = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  test() {
    this.panelOpenState = !this.panelOpenState;
  }

  placeBid() {
    this.dialog.open(PlaceBidModalComponent, {
      data: {
        animal: 'panda'
      },
      width: "500px",
      maxWidth: "90vw"
    });
  }
}
