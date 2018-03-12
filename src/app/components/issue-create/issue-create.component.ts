import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import UserService from 'app/services/user.service';
import IssueService from 'app/services/issue.service';

import Issue from 'app/models/Issue';

@Component({
	selector: 'app-issue-create',
	templateUrl: './issue-create.component.html',
	styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
	username: string;
	reponame: string;
	err: string;

	constructor(
		private issueService: IssueService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute) {
		route.parent.params.subscribe((params) => {
			this.username = params.user;
			this.reponame = params.repo;
		});
	}

	submitIssue(title: HTMLInputElement, description: HTMLInputElement){
		let t = title.value.trim();
		let d = description.value.trim();
		if(t.length > 0 && d.length > 0){
			let issue = new Issue();
			issue.username = this.username;
			issue.reponame = this.reponame;
			issue.title = t;
			issue.description = d;
			this.issueService.create(issue).subscribe((res: any) => {
				if(res.success){
					this.router.navigate([this.username, this.reponame, 'issues', res.id]);
				}else{
					this.err = res.message;
				}
			});
		}else{
			this.err = 'please complete all the fields';
		}
	}

	ngOnInit() {
	}

}
