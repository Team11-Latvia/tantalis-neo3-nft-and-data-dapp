import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-bid-modal',
  templateUrl: './place-bid-modal.component.html',
  styleUrls: ['./place-bid-modal.component.scss']
})
export class PlaceBidModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlaceBidModalComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  placeBid() {
    this.close();
  }
}
