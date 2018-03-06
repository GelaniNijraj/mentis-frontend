import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Repo from 'app/models/Repo';
import Response from 'app/models/Response';
import RepoService from 'app/services/repo.service';

@Component({
	selector: 'app-create-repo',
	templateUrl: './create-repo.component.html',
	styleUrls: ['./create-repo.component.css']
})
export class CreateRepoComponent implements OnInit {
	error: string;
	constructor(private repoService: RepoService, private router: Router) { }

	ngOnInit() {
	}

	createRepo(name, description, _public){
		let repo = new Repo();
		repo.name = name.value;
		repo.description = description.value;
		repo.public = _public;
		if(repo.name.length == 0){
			this.error = "Please enter a valid name";
		}else{
	  	this.repoService.create(repo).subscribe((res: Response) => {
	  		if(res.success)
	  			this.router.navigateByUrl('/repo/all');
	  		else
	  			this.error = res.message;
	  	});
	}
		return false;
	}

}
