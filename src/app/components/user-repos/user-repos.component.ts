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
	starred = false;

	constructor(
	private repoService: RepoService,
	private route: ActivatedRoute,
	private userService: UserService) {
		route.params.subscribe(params => {
			this.username = params.user;
			route.url.subscribe(url => {
				console.log('here');
				if(url[2].path == 'stars'){
					this.starred = true;
					userService.stars(params.user).subscribe((res: any) => {
						console.log(res);
						if(res.success)
							this.repos = res.stars;
					});
				}else if(url[2].path == 'repos'){
					repoService.all(params.user).subscribe((res: any) => {
						if(res.success)
							this.repos = res.repos;
					});
				}
			});
		})
	}

	ngOnInit() {
	}

}
