import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

import User from 'app/models/User';
import UserService from 'app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user:User;
	message = '';

	constructor(
		private userService: UserService,
		private cookies: CookieService, 
		private router: Router) {
	}

	loginButtonPressed(username: HTMLInputElement, password: HTMLInputElement){
		// TODO: login logic
		this.userService.login(username.value, password.value).subscribe((res: any) => {
			console.log(res);
			if(res.success){
				this.cookies.set('token', res.token);
				this.cookies.set('username', username.value);
				this.router.navigateByUrl('/');
			}else{
				this.message = 'incorrect username/password';
			}
		});
		return false;
	}

	ngOnInit() {
	}
}
