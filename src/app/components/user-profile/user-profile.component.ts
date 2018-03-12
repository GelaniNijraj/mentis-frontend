import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import RepoService from 'app/services/repo.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	repoCount = 0;
	username: string;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private repoService: RepoService
  ) {
  	this.route.params.subscribe(params => {
  		this.username = params.user;
  		this.repoService.count(this.username).subscribe((res: any) => {
  			console.log(res);
  			if(res.success)
  				this.repoCount = res.count;
  		}, (err: any) => {
  			if(err.status == 404)
  				router.navigateByUrl('not-found');
  		});
  	});
  }

  ngOnInit() {
  }

}
