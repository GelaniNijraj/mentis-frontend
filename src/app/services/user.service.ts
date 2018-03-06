import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import User from 'app/models/User';
import Response from 'app/models/Response';

@Injectable()
export default class UserService {

	public loggedIn: boolean;
	private baseUrl: string = 'http://127.0.0.1:3000/api/user/';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private options = {headers: this.headers};

	constructor(private http: HttpClient, private cookies: CookieService) {

	}

	isLoggedIn() {
		// TODO: validate token
		return this.cookies.get('token') != undefined && 
				this.cookies.get('token') != 'undefined' && 
				this.cookies.get('token') != '';
	}

	getToken() {
		return this.cookies.get('token');
	}

	getUsername() {
		return this.cookies.get('username');
	}

	login(username: string, password: string, callback) {
	this.http.post(this.baseUrl + 'authenticate', {
		username, password
	}, this.options).subscribe((res: Response) => {
		if(!res.success)
			callback(new Error(res.message));
		this.cookies.set('token', (res as any).token);
		this.cookies.set('username', username);
		callback(false);
	});
	}

	register(user: User) {
		return this.http.post(this.baseUrl + 'register', {
			username: user.username,
			email: user.email,
			password: user.password
		}, this.options);
	}

	logout(callback){
		this.cookies.delete('token');
		this.cookies.delete('username');
		callback();
	}
}
