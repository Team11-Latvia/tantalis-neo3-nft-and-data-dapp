import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  public logIn(): void {
    this.isLoggedIn.next(true);
  }

  public logOut(): void {
    this.isLoggedIn.next(false);
  }
}
