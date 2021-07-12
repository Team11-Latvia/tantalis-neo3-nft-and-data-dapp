import { TextModalComponent } from './../../../../shared/modals/text-modal/text-modal.component';
import { UserAuthService } from './../../../../shared/services/user/user.auth.service';
import { SignUpModalComponent } from './../../../../shared/modals/sign-up-modal/sign-up-modal.component';
import { AuthService } from './../../../../shared/services/auth.service';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'none',
      })),
      state('closed', style({
        transform: 'translateY(-60px)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isLoggedIn: boolean = false;
  public isOpen = false;
  public showCustomToggle: boolean = true;

  private toggleButton: any;
  private sidebarVisible: boolean;
  private isLogInSubscription: Subscription;

  constructor(
    public location: Location,
    private element: ElementRef,
    public dialog: MatDialog,
    private router: Router,
    private readonly userAuthService: UserAuthService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.isLogInSubscription = this.userAuthService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  public openDataMarketCommingSoon() {
    this.dialog.open(TextModalComponent, {
      data: {
        title: 'Data Market',
        content: [
          { type: 'TEXT', data: 'Coming very soon!' },
          { type: 'TEXT', data: 'Tantalis will be a place where You will be available to sell/buy different data sets of anything for cryptos. All data will be hosted on decentralized data storage files system (DFS).' },
          { type: 'TEXT', data: 'Including but not limited to different useful digital projects, games, visuals, software, designs, and anything digital.' },
          { type: 'TEXT', data: 'Be patient, we are close to launching!' }
        ]
      },
      width: "500px",
      maxWidth: "90vw"
    });
  }

  ngOnDestroy(): void {
    this.isLogInSubscription?.unsubscribe();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton?.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '/documentation') {
      return true;
    }
    else {
      return false;
    }
  }

  openSignUpDialog() {
    this.dialog.open(SignUpModalComponent, {
      data: {
        animal: 'panda'
      },
      width: "500px",
      maxWidth: "90vw"
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  wallet() {
    this.isOpen = false;
    this.showCustomToggle = false;
    this.router.navigateByUrl("/wallet");
    setTimeout(() => {
      this.showCustomToggle = true;
    }, 500);
  }

  logout() {
    this.userAuthService.logOut();
  }
}
