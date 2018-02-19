import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import UserService from './user.service';

@Injectable()
export class DashboardGuardService implements CanActivate {

  constructor(private userService:UserService, private router:Router) {
  };

  canActivate(){
  	if(this.userService.isLoggedIn()){
  		return true;
  	}else{
  		this.router.navigateByUrl("/login");
  		return false;
  	}
  }

}
