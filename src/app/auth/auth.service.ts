import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _isUserAuthenticated = true;

  // tslint:disable-next-line: variable-name
  private _userId = 'u1';

  constructor() { }

  get userId() {
    return this._userId;
  }

  get isUserAuthenticated() {
    return this._isUserAuthenticated;
  }

  login() {
    this._isUserAuthenticated = true;
  }

  logout() {
    this._isUserAuthenticated = false;
  }
}
