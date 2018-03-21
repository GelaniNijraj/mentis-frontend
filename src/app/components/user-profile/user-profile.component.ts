import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import RepoService from 'app/services/repo.service';
import UserService from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	repoCount = 0;
	starsCount = 0;
	username = '';
	baseUrl = 'http://127.0.0.1:3000/api';

	about = '';

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private repoService: RepoService,
  	private userService: UserService
  ) {
  	this.route.params.subscribe(params => {
  		this.username = params.user;

  		this.userService.profile(this.username).subscribe((res: any) => {
  			if(res.success)
  				this.about = res.about;
  		});

  		this.repoService.count(this.username).subscribe((res: any) => {
  			if(res.success)
  				this.repoCount = res.count;
  		}, (err: any) => {
  			if(err.status == 404)
  				router.navigateByUrl('not-found');
  		});

  		this.userService.starsCount(this.username).subscribe((res: any) => {
  			if(res.success)
  				this.starsCount = res.count;
  		});
  	});
  }

  ngOnInit() {
  }

}
