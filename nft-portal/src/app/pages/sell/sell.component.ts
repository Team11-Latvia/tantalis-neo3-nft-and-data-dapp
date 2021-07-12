import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  panelOpenState = true;

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    this.panelOpenState = !this.panelOpenState;
  }
}
