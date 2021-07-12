import { Logger } from './../../shared/logger/logger';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  private readonly logger = new Logger(MainLayoutComponent.name);

  constructor(
  ) { }

  async ngOnInit(): Promise<void> {
  }
}
