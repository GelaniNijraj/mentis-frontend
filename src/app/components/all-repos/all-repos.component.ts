import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Repo from 'app/models/Repo';
import Response from 'app/models/Response';
import RepoService from 'app/services/repo.service';
import UserService from 'app/services/user.service';

@Component({
	selector: 'app-all-repos',
	templateUrl: './all-repos.component.html',
	styleUrls: ['./all-repos.component.css']
})
export class AllReposComponent implements OnInit {
	repos: Repo[];

	constructor(
	private repoService: RepoService, 
	private userService: UserService) {
		repoService.getAll().subscribe((res: Response) => {
			if(res.success)
				this.repos = res.data;
		});
	}

	ngOnInit() {
	}

}
