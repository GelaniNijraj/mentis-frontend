import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-repo',
	templateUrl: './repo.component.html',
	styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
	username = '';
	reponame = '';
	constructor(private route: ActivatedRoute) { 
		route.params.subscribe(params => {
			this.username = params.user;
			this.reponame = params.repo;
		});
	}

	ngOnInit() {
	}

}
