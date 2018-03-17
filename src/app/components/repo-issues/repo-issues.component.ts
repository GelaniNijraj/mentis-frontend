import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distanceInWordsToNow } from 'date-fns';

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
		console.log(distanceInWordsToNow(new Date()));
		route.params.subscribe(p => {
			let label = p.label;
			console.log(label);
			route.parent.params.subscribe(params => {
				this.username = params.user;
				this.reponame = params.repo;
				issueService
					.all(params.user, params.repo, label)
					.subscribe((res: any) => {
						if(res.success){
							this.issues = res.issues;
						}
					});
			})
		});
	}

	ago(date: Date){
		return distanceInWordsToNow(date) + ' ago';
	}

	ngOnInit() {
	}

}
