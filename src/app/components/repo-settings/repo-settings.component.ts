import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import RepoService from 'app/services/repo.service';
import Repo from 'app/models/Repo';

@Component({
	selector: 'app-repo-settings',
	templateUrl: './repo-settings.component.html',
	styleUrls: ['./repo-settings.component.css']
})
export class RepoSettingsComponent implements OnInit {

	username: string;
	reponame: string;

	constructor(
		private repoService: RepoService,
		private router: Router,
		private route: ActivatedRoute){
		route.parent.params.subscribe(params => {
			this.username = params.user;
			this.reponame = params.repo;
		})
	}

	deleteRepo(){
		let repo = new Repo();
		repo.owner = this.username;
		repo.name = this.reponame;
		this.repoService.delete(repo).subscribe((res: any) => {
			if(res.success){
				this.router.navigateByUrl('/repo/all');
			}
		});
	}

	ngOnInit() {
	}

}
