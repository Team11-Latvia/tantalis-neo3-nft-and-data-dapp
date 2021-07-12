import { Logger } from './../../logger/logger';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthService } from './../../services/user/user.auth.service';
import { UserInfoService } from './../../services/user/user.info.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data: DialogData;

  private readonly logger = new Logger(SignUpModalComponent.name);

  constructor(
    public readonly dialogRef: MatDialogRef<SignUpModalComponent>,
    public readonly dialog: MatDialog,
    private readonly userAuthService: UserAuthService,
    private readonly userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

  async onConnectWallet(): Promise<void> {
    this.close();

    this.userInfoService.clearUserInfo();

    try {
      this.userAuthService.authorizeUser();
    } catch(e) {
      this.logger.error(e);
      this.userInfoService.clearUserInfo();
      
      const errorMessage = this.formatException(e);
      window.alert(errorMessage);
    }
  }

  private formatException(e: any): string {
    if (!e) {
        return 'unknown error';
    }

    if (e.message) {
        return e.message;
    }

    if (e.type && e.description) {
        return e.description;
    }

    if (e.toString) {
        return e.toString();
    }

    return e;
}
}
