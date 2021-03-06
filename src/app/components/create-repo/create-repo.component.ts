import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Repo from 'app/models/Repo';
import Response from 'app/models/Response';
import RepoService from 'app/services/repo.service';
import UserService from 'app/services/user.service';

@Component({
	selector: 'app-create-repo',
	templateUrl: './create-repo.component.html',
	styleUrls: ['./create-repo.component.css']
})
export class CreateRepoComponent implements OnInit {
	error: string;
	repo = new Repo('', '', true);

	constructor(
		private repoService: RepoService, 
		private userService: UserService,
		private router: Router) { 
	}

	ngOnInit() {
	}

	onSubmit(){
		this.repoService.create(this.repo).subscribe((res: Response) => {
			if(res.success)
				this.router.navigateByUrl(['user', this.userService.getUsername(), 'repos'].join('/'));
			else
				this.error = res.message;
		});
	}
}
