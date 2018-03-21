import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import config from 'app/config';
import RepoService from 'app/services/repo.service';
import Repo from 'app/models/Repo';
declare var $ : any;

@Component({
	selector: 'app-repo-settings',
	templateUrl: './repo-settings.component.html',
	styleUrls: ['./repo-settings.component.css']
})
export class RepoSettingsComponent implements OnInit {

	username: string;
	reponame: string;
	contributors = [];
	info: any;
	conerr = false;

	constructor(
		private repoService: RepoService,
		private router: Router,
		private route: ActivatedRoute){
		route.parent.params.subscribe(params => {
			this.username = params.user;
			this.reponame = params.repo;
			repoService.info(this.username, this.reponame).subscribe((res: any) => {
				if(res.success){
					this.info = res;
				}
			});
			repoService.contributors(this.username, this.reponame).subscribe((res: any) => {
				if(res.success)
					this.contributors = res.contributors;
			});
		})
	}

	addContributor(btn: HTMLInputElement, textbox: HTMLInputElement){
		btn.disabled = true;
		let contributor = textbox.value.trim();
		if(contributor.length > 0 && contributor != this.username){
			let c = {username: contributor};
			this.contributors.push(c);
			this.repoService.addContributor(this.username, this.reponame, contributor).subscribe((res: any) => {
				this.conerr = !res.success;
				btn.disabled = false;
				if(!res.success)
					this.contributors.pop();
			});
		} else {
			btn.disabled = false;
			this.conerr = true;
		}
		return false;
	}

	removeContributor(contributor: string){
		let original = this.contributors;
		let tmp = this.contributors;
		tmp.find((e, i) => {
			if(e.username == contributor){
				if(i + 1 < tmp.length)
					tmp = tmp.slice(0, i).concat(tmp.slice(i + 1, tmp.length));
				else
					tmp = tmp.slice(0, i);
				this.contributors = tmp;
				return true;
			}
		})
		this.repoService.removeContributor(this.username, this.reponame, contributor).subscribe((res: any) => {
			if(!res.success)
				this.contributors = original;
		});
		return false;
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

	updateIssues(box: HTMLInputElement){
		box.disabled = true;
		this.info.issuesEnabled = box.checked;
		this.repoService.setIssues(this.username, this.reponame, box.checked).subscribe((res: any) => {
			box.disabled = false;
			if(!res.success){
				box.checked = !box.checked;
				this.info.issuesEnabled = box.checked;
			}else{
				window.location.reload();
			}
		});
	}

	renameRepo(name: string){
		name = name.trim();
		if(name.length > 0 && name != this.reponame){
			this.repoService.rename(this.username, this.reponame, name).subscribe((res: any) => {
				if(res.success)
					this.router.navigateByUrl([this.username, name, 'settings'].join('/'))
			});
		}
	}

	ngAfterViewInit() {
		$(document).ready(function() {
			$('.ui.checkbox').checkbox();
			$('#usersearch')
			  .search({
			    apiSettings: {
			      url: [config.baseUrl, 'api/user/users/search/{query}'].join('/')
			    },
			    fields: {
			      results : 'users',
			      title   : 'username'
			    },
			    minCharacters : 3
			  })
			;
		})
	}

	ngOnInit() {
	}

}
