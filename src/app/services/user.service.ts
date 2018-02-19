import { Injectable } from '@angular/core';

@Injectable()
export default class UserService {

  public loggedIn: boolean;

  constructor() { }

  isLoggedIn() {
  	return this.loggedIn;
  }

}
