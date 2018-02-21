import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  create(repo: Repo) {
  	return this.http.post(this.baseUrl + 'create', {
  		token: this.userService.getToken(),
  		name: repo.name,
  		public: repo.public,
  		description: repo.description
  	});
  }

}
