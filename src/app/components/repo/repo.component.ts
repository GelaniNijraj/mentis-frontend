import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import UserService from 'app/services/user.service';

@Component({
	selector: 'app-repo',
	templateUrl: './repo.component.html',
	styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
	username = '';
	reponame = '';
	constructor(
		private route: ActivatedRoute,
		private userService: UserService
	) { 
		route.params.subscribe(params => {
			this.username = params.user;
			this.reponame = params.repo;
		});
	}

	ngOnInit() {
	}

}
