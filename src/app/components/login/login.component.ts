import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/User';
import UserService from 'app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user:User;

	constructor(private userService: UserService, private router: Router) {
		this.user = new User();
		this.user.name = "Nijraj"
	}

	loginButtonPressed(){
		// TODO: login logic
		this.userService.loggedIn = true;
		this.router.navigateByUrl('/dashboard');
		return false;
	}

	ngOnInit() {
	}
}
