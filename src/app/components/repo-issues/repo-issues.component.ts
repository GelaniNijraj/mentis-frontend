import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import IssueService from 'app/services/issue.service';

@Component({
	selector: 'app-repo-issues',
	templateUrl: './repo-issues.component.html',
	styleUrls: ['./repo-issues.component.css']
})
export class RepoIssuesComponent implements OnInit {
	username: string;
	reponame: string;
	issues: any[];

	constructor(
		private issueService: IssueService,
		private route: ActivatedRoute){
		route.parent.params.subscribe(params => {
			issueService
				.all(params.user, params.repo)
				.subscribe((res: any) => {
					if(res.success){
						this.issues = res.issues;
					}
				});
		})
	}

	ngOnInit() {
	}

}
