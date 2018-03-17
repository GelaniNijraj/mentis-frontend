import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $ :any;

import config from 'app/config';
import UserService from 'app/services/user.service';
import RepoService from 'app/services/repo.service';

@Component({
	selector: 'app-menubar',
	templateUrl: './menubar.component.html',
	styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterViewInit {

	constructor(
		private userService: UserService,
		private repoService: RepoService,
		private router: Router
	) { }

	logout(){
		this.userService.logout(() => this.router.navigateByUrl('/'));
	}

	searchRepos(query: string){
		query = query.trim();
		if(query.length > 0){
			this.repoService.search(query).subscribe((res: any) => {
				console.log(res);
			});
		}
	}

	ngOnInit() {}

	ngAfterViewInit() {
		$('.ui.search')
		  .search({
		    apiSettings: {
		      url: [config.baseUrl, 'api/repo/repos/search/{query}'].join('/')
		    },
		    fields: {
		      results : 'repos',
		      title   : 'name',
		      url     : 'location'
		    },
		    minCharacters : 3
		  })
		;
	}



}
