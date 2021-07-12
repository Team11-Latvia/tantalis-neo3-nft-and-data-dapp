import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-nft',
  templateUrl: './choose-nft.component.html',
  styleUrls: ['./choose-nft.component.scss']
})
export class ChooseNFTComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goStep2() {
    this.router.navigateByUrl("/select-create-collection");
  }
}
