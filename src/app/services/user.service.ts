import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public loggedIn: boolean;

  constructor() { }

  isLoggedIn() {
  	return this.loggedIn;
  }

}
