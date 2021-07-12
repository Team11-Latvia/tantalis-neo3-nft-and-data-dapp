import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsSubscriptionApiService } from '@app/shared/services/news-subscription/news.subscription.api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef;

  constructor(
    public readonly dialog: MatDialog,
    private readonly newsSubscriptionApiService: NewsSubscriptionApiService
  ) { }

  ngOnInit(): void {
  }

  async openSignUpDialog(): Promise<void> {
    const email = this.emailInput.nativeElement.value;
    const result = await this.newsSubscriptionApiService.subscribe(email);

    // TODO: Provide visual feedback here
    console.dir(result);

    // this.dialog.open(SignUpModalComponent, {
    //   data: {
    //     animal: 'panda'
    //   },
    //   width: "500px",
    //   maxWidth: "90vw"
    // });
  }
}
