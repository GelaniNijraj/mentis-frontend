import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import UserService from 'app/services/user.service';
import RepoService from 'app/services/repo.service';

@Component({
	selector: 'app-repo',
	templateUrl: './repo.component.html',
	styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
	username = '';
	reponame = '';

	info: any;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private repoService: RepoService
	) { 
		route.params.subscribe(params => {
			this.username = params.user;
			this.reponame = params.repo;
			repoService.info(this.username, this.reponame).subscribe((res: any) => {
				if(res.success){
					this.info = res;
				}
			})
		});
	}

	ngOnInit() {
	}

}
