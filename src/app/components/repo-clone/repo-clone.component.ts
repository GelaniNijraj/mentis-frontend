import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import UserService from 'app/services/user.service';
import RepoService from 'app/services/repo.service';

@Component({
  selector: 'app-repo-clone',
  templateUrl: './repo-clone.component.html',
  styleUrls: ['./repo-clone.component.css']
})
export class RepoCloneComponent implements OnInit {
	username = '';
	reponame = '';
	message = '';

  constructor(
	private route: ActivatedRoute,
	private router: Router,
	private userService: UserService,
	private repoService: RepoService
  ) {

	route.parent.params.subscribe(params => {
		this.username = params.user;
		this.reponame = params.repo;
	});
  }

  ngOnInit() {
  }


  cloneRepo(name: HTMLInputElement, description: HTMLInputElement){
  	let n = name.value.trim(), d = description.value.trim();
  	if(n.length > 0 && d.length > 0){
		this.repoService.clone(this.username, this.reponame, n, d).subscribe((res: any) => {
			if(res.success){
				this.router.navigateByUrl(['', this.userService.getUsername(), n].join('/'));
			}else{
				this.message = 'Something went wrong...';
			}
		})
  	}else{
  		this.message = 'Please complete all the fields...';
  	}
  }
}
