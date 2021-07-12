import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NFTItemData } from './../../create-nft.component';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent {

  @Input() public nftItemData: NFTItemData;
  @Output() private nextStep: EventEmitter<void> = new EventEmitter<void>();

  public chooseMethod(method: string): void {
    if (method !== 'FIXED' && method !== 'BID') {
      return;
    }

    this.nftItemData.method = method;
    this.nextStep.emit();
  }
}
