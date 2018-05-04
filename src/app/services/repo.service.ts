import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import Repo from 'app/models/Repo';
import UserService from 'app/services/user.service';

@Injectable()
export default class RepoService {

	private _baseUrl: string = 'http://127.0.0.1:3000/api/repo';
	private baseUrl: string = 'http://127.0.0.1:3000/api';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private options = {headers: this.headers};

	constructor(private http: HttpClient, private userService: UserService) { }

	getAll() {
		return this.http.post(this._baseUrl + '/all', {
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
		return this.http.get(this._baseUrl + '/files', { params: params });
	}

	fileContent(user: string, repo: string, file: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('file', file);
		return this.http.get([this._baseUrl, user, repo, 'files/content'].join('/'), { params: params });
	}

	info(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this._baseUrl, user, repo, 'info'].join('/'), { params: params });
	}

	all(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('username', user);
		return this.http.get(this._baseUrl + '/' + [user, 'repos', 'all'].join('/'), { params: params });
	}

	count(user: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('username', user);
		return this.http.get(this._baseUrl + '/' + [user, 'repos', 'count'].join('/'), { params: params });
	}

	search(query: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get(this._baseUrl + ['repos', '/search', query].join('/'), { params: params });
	}

	create(repo: Repo) {
		return this.http.post(this._baseUrl + '/create', {
			token: this.userService.getToken(),
			name: repo.name,
			public: repo.isPublic,
			description: repo.description
		});
	}

	// settings
	rename(user: string, repo: string, name: string) {
		return this.http.post([this._baseUrl, user, repo, 'rename'].join('/'), {
			token: this.userService.getToken(),
			name: name
		});
	}

	setIssues(user: string, repo: string, enable: boolean) {
		if(enable)
			return this.http.post([this.baseUrl, user, repo, 'issues/enable'].join('/'), {
				token: this.userService.getToken()
			});
		else
			return this.http.post([this.baseUrl, user, repo, 'issues/disable'].join('/'), {
				token: this.userService.getToken()
			});
	}

	delete(repo: Repo) {
		return this.http.post(this._baseUrl + '/delete', {
			token: this.userService.getToken(),
			repo: repo.name,
			owner: repo.owner
		});
	}

	// committy stuff
	commitsCount(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this._baseUrl, user, repo, 'commits/count'].join('/'), { params: params });
	}

	// branchy stuff
	branchCount(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this._baseUrl, user, repo, 'branches/count'].join('/'), { params: params });
	}

	// starry stuff
	starsCount(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this._baseUrl, user, repo, 'stars/count'].join('/'), { params: params });
	}

	// clonny stuff
	clone(user: string, repo: string, name: string, description: string) {
		return this.http.post([this._baseUrl, user, repo, 'clone'].join('/'), {
			name: name,
			description: description,
			token: this.userService.getToken()
		});
	}

	star(user: string, repo: string) {
		return this.http.post([this._baseUrl, user, repo, 'star'].join('/'), {
			token: this.userService.getToken()
		});
	}

	unstar(user: string, repo: string) {
		return this.http.post([this._baseUrl, user, repo, 'unstar'].join('/'), {
			token: this.userService.getToken()
		});
	}

	// contribution
	contributors(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this._baseUrl, user, repo, 'contributors'].join('/'), { params: params });
	}

	addContributor(user: string, repo: string, contributor: string) {
		return this.http.post([this._baseUrl, user, repo, 'contributors/add', contributor].join('/'), {
			token: this.userService.getToken()
		});
	}

	removeContributor(user: string, repo: string, contributor: string) {
		return this.http.post([this._baseUrl, user, repo, 'contributors/remove', contributor].join('/'), {
			token: this.userService.getToken()
		});
	}

}
