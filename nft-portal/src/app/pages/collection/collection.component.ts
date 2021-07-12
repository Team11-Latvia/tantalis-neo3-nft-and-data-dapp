import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  ownerAvatar: string;
  ownerName: string;
  price: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: "Wipe", ownerAvatar: 'assets/imgs/collection/Theresa Webb.png', ownerName: 'Theresa Webb', price: "0,0214"},
  {name: "Floor", ownerAvatar: 'assets/imgs/collection/Jerome Bell.png', ownerName: 'Jerome Bell', price: "0,0214"},
  {name: "Frantic", ownerAvatar: 'assets/imgs/collection/Cameron Williamson.png', ownerName: 'Cameron Williamson', price: "0,0214"},
  {name: "Request", ownerAvatar: 'assets/imgs/collection/Kristin Watson.png', ownerName: 'Kristin Watson', price: "0,0214"},
  {name: "Scary", ownerAvatar: 'assets/imgs/collection/Jenny Wilson.png', ownerName: 'Jenny Wilson', price: "0,0214"},
  {name: "Excite", ownerAvatar: 'assets/imgs/collection/Wade Warren.png', ownerName: 'Wade Warren', price: "0,0214"},
  {name: "Bumpy", ownerAvatar: 'assets/imgs/collection/Eleanor Pena.png', ownerName: 'Eleanor Pena', price: "0,0214"},
  {name: "Crowded", ownerAvatar: 'assets/imgs/collection/Annette Black.png', ownerName: 'Annette Black', price: "0,0214"},
];

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  displayedColumns: string[] = ['name', 'owner', 'price', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

}
