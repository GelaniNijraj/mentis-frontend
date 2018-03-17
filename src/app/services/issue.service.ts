import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import Issue from 'app/models/Issue';
import UserService from 'app/services/user.service';


@Injectable()
export default class IssueService {

	private baseUrl: string = 'http://127.0.0.1:3000/api';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private options = {headers: this.headers};

	constructor(private http: HttpClient, private userService: UserService) { }

	create(issue: Issue) {
		return this.http.post([this.baseUrl, issue.username, issue.reponame, 'issues', 'create'].join('/'), {
			title: issue.title,
			description: issue.description,
			token: this.userService.getToken()
		}, this.options);
	}

	close(user: string, repo: string, issue: string) {
		return this.http.post([this.baseUrl, user, repo, 'issues', issue, 'close'].join('/'), {
			token: this.userService.getToken()
		}, this.options);
	}

	open(user: string, repo: string, issue: string) {
		return this.http.post([this.baseUrl, user, repo, 'issues', issue, 'open'].join('/'), {
			token: this.userService.getToken()
		}, this.options);
	}

	reply(issue: Issue, reply: string) {
		return this.http.post([this.baseUrl, issue.username, issue.reponame, 'issues', issue.id, 'reply'].join('/'), {
			description: reply,
			token: this.userService.getToken()
		}, this.options);
	}

	all(user: string, repo: string, label: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		params = params.append('label', label);
		return this.http.get([this.baseUrl, user, repo, 'issues', 'all'].join('/'), { params: params });
	}

	get(user: string, repo: string, id: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this.baseUrl, user, repo, 'issues', id].join('/'), { params: params });
	}

	count(user: string, repo: string) {
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this.baseUrl, user, repo, 'issues', 'count'].join('/'), { params: params });
	}

	allLabels(user: string, repo: string){
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this.baseUrl, user, repo, 'issues/labels/all'].join('/'), { params: params });
	}

	labels(user: string, repo: string, issue: string){
		let params = new HttpParams();
		params = params.append('token', this.userService.getToken());
		return this.http.get([this.baseUrl, user, repo, 'issues', issue, 'labels'].join('/'), { params: params });
	}

	createLabel(user: string, repo: string, title: string){
		return this.http.post([this.baseUrl, user, repo, 'issues/labels/create'].join('/'), {
			title: title,
			token: this.userService.getToken()
		}, this.options);
	}

	assignLabel(user: string, repo: string, issue: string, label: string){
		return this.http.post([this.baseUrl, user, repo, 'issues', issue, 'labels/assign', label].join('/'), {
			token: this.userService.getToken()
		}, this.options);
	}

	resignLabel(user: string, repo: string, issue: string, label: string){
		return this.http.post([this.baseUrl, user, repo, 'issues', issue, 'labels/resign', label].join('/'), {
			token: this.userService.getToken()
		}, this.options);
	}
}
