import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import User from 'app/models/User';
import Response from 'app/models/Response';
import UserService from 'app/services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public error: string;
	constructor(private userService: UserService, private router: Router) {

	}

	ngOnInit() {
	}

	registerButtonPressed(username, password, rpassword, email){
		let user = new User();
		if(username.value.length == 0 || password.value.length == 0 || email.value.length == 0){
			this.error = 'Complete all the fields';
			return false;
		}
		user.username = username.value;
		user.password = password.value;
		if(password.value != rpassword.value){
			this.error = 'Password do not match...';
			return false;
		}
	user.email = email.value;
	this.userService.register(user).subscribe((res: Response) => {
		if(res.success)
			this.router.navigateByUrl('/login');
		else
			this.error = 'Something went wrong...';
	});
	return false;
	}

}
