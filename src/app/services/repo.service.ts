import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import Repo from 'app/models/Repo';
import UserService from 'app/services/user.service';

@Injectable()
export default class RepoService {

	private baseUrl: string = 'http://127.0.0.1:3000/api/repo/';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private options = {headers: this.headers};

	constructor(private http: HttpClient, private userService: UserService) { }

	getAll() {
		return this.http.post(this.baseUrl + 'all', {
			token: this.userService.getToken()
		}, this.options);
	}

	getFiles(user: string, repo: string, root: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('username', user);
		params = params.append('reponame', repo);
		if(root == undefined)
			root = '';
		params = params.append('root', root);
		return this.http.get(this.baseUrl + 'files', { params: params });
	}

	getInfo(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('username', user);
		params = params.append('reponame', repo);
		return this.http.get(this.baseUrl + 'info', { params: params });
	}

	all(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('username', user);
		return this.http.get(this.baseUrl + [user, 'repos', 'all'].join('/'), { params: params });
	}

	count(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('username', user);
		return this.http.get(this.baseUrl + [user, 'repos', 'count'].join('/'), { params: params });
	}

	create(repo: Repo) {
		return this.http.post(this.baseUrl + 'create', {
			token: this.userService.getToken(),
			name: repo.name,
			public: repo.isPublic,
			description: repo.description
		});
	}

	delete(repo: Repo) {
		return this.http.post(this.baseUrl + 'delete', {
			token: this.userService.getToken(),
			repo: repo.name,
			owner: repo.owner
		});
	}

}
