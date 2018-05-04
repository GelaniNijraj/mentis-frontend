import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import RepoService from 'app/services/repo.service';
import IssueService from 'app/services/issue.service';

@Component({
	selector: 'app-repo-code',
	templateUrl: './repo-code.component.html',
	styleUrls: ['./repo-code.component.css']
})
export class RepoCodeComponent implements OnInit {
	reponame: string;
	username: string;
	allFiles: string[];
	files: any[];

	info: any;
	fileRoot: string;
	current: string;
	issueCount: number;
	parent: string;

	commits = 0;
	branches = 0;
	stars = 0;

	displayFile: string;
	displayContent: string;

	constructor(
		private repoService: RepoService, 
		private router: Router,
		private issueService: IssueService,
		private route: ActivatedRoute) {
		this.issueCount = 0;
		route.parent.params.subscribe(params => {
			this.reponame = params.repo;
			this.username = params.user;
			this.route.params.subscribe(q => {
				this.current = q.path == undefined ? '' : q.path;
				let tmp = this.current.split('/');
				this.parent = tmp.splice(0, tmp.length - 1).join('/');
				repoService.getFiles(params.user, params.repo, q.path).subscribe((res: any) => {
					this.files = res.files;
				});
				repoService.info(params.user, params.repo).subscribe((res: any) => {
					this.info = res;
				});
				repoService.starsCount(params.user, params.repo).subscribe((res: any) => {
					if(res.success)
						this.stars = res.count;
				});
				repoService.commitsCount(params.user, params.repo).subscribe((res: any) => {
					if(res.success)
						this.commits = res.count;
				});
				repoService.branchCount(params.user, params.repo).subscribe((res: any) => {
					if(res.success)
						this.branches = res.count;
				});
				issueService.count(params.user, params.repo).subscribe((res: any) => {
					if(res.success)
						this.issueCount = res.count;
				});
			});
		});
	}

	showFile(path: string){
		this.repoService.fileContent(this.username, this.reponame, path).subscribe((res: any) => {
			if(res.success){
				this.displayFile = path;
				this.displayContent = res.content;
			}
		});
		return false;
	}

	starRepo(){
		this.info.starred = true;
		this.stars++;
		this.repoService.star(this.username, this.reponame).subscribe((res: any) => {
			if(!res.success)
				this.stars--;
		});
		return false;
	}

	unstarRepo(){
		this.info.starred = false;
		this.stars--;
		this.repoService.unstar(this.username, this.reponame).subscribe((res: any) => {
			if(!res.success)
				this.stars++;
		});
		return false;
	}

	copyURL(el:HTMLInputElement){
		el.focus();
		el.select();
		let out = document.execCommand('copy');
	}

	ngOnInit() {
	}

}
