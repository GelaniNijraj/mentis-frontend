import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Repo from 'app/models/Repo';
import Response from 'app/models/Response';
import RepoService from 'app/services/repo.service';
import UserService from 'app/services/user.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit {
	repos: Repo[];
	username = '';

	constructor(
	private repoService: RepoService,
	private route: ActivatedRoute,
	private userService: UserService) {
		route.params.subscribe(params => {
			this.username = params.user;
			repoService.all(params.user).subscribe((res: any) => {
				if(res.success)
					this.repos = res.repos;
			});
		})
	}

	ngOnInit() {
	}

}
