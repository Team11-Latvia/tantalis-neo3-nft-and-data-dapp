import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NFTItemData } from './../../create-nft.component';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent {

  @Input() public nftItemData: NFTItemData;
  @Output() private nextStep: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  public totalFee: number = 2.5;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      price: [null, Validators.required],
      interest: [null, Validators.required]
    });
  }

  public submit(): void {
    if (this.form.invalid){
      return;
    }

    this.nftItemData.price = this.form.get('price')?.value;
    this.nftItemData.interest = this.form.get('interest')?.value;
    this.nextStep.emit();
  }

  public updateTotalFee(event: Event): void {
    const value = (<HTMLInputElement>event.target).value;
    this.totalFee = 2.5 + Number(value);
  }
}
