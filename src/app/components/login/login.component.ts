import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

import User from 'app/models/User';
import UserService from 'app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user:User;

	constructor(
		private userService: UserService, 
		private router: Router) {
	}

	loginButtonPressed(username: HTMLInputElement, password: HTMLInputElement){
		// TODO: login logic
		this.userService.login(username.value, password.value, (err) => {
			if(!err)
				this.router.navigateByUrl('/');
		});
		return false;
	}

	ngOnInit() {
	}
}
