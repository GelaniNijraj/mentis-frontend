import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import User from 'app/models/User';
import Response from 'app/models/Response';

@Injectable()
export default class UserService {

	public loggedIn: boolean;
	private baseUrl: string = 'http://127.0.0.1:3000/api/user';
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

	getUser(){
		let u = new User();
		u.username = this.getUsername();
		return u;
	}

	login(username: string, password: string) {
		return this.http.post(this.baseUrl + '/authenticate', {
			username, password
		}, this.options);
	}

	stars(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.getToken());
		return this.http.get([this.baseUrl, user, 'stars'].join('/'), { params: params });
	}

	starsCount(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.getToken());
		return this.http.get([this.baseUrl, user, 'stars/count'].join('/'), { params: params });
	}

	profile(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.getToken());
		return this.http.get([this.baseUrl, user, 'profile'].join('/'), { params: params });
	}

	register(user: User) {
		return this.http.post(this.baseUrl + '/register', {
			username: user.username,
			email: user.email,
			password: user.password
		}, this.options);
	}

	changePassword(user: string, oldpass: string, newpass: string) {
		return this.http.post([this.baseUrl, user, 'settings'].join('/'), {
			token: this.getToken(),
			oldpass: oldpass.trim(),
			newpass: newpass.trim()
		}, this.options);
	}

	changeAbout(user: string, about: string) {
		return this.http.post([this.baseUrl, user, 'settings'].join('/'), {
			token: this.getToken(),
			about: about.trim()
		}, this.options);
	}

	changeProfilePic(user: string, file: HTMLInputElement) {
		const formdata = new FormData();
		let f = file.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(f);
		formdata.append('profilepic', f);
		formdata.append('token', this.getToken());
		return this.http.post([this.baseUrl, user, 'settings/profilepic'].join('/'), formdata, {});
	}

	logout(callback){
		this.cookies.delete('token');
		this.cookies.delete('username');
		callback();
	}
}
