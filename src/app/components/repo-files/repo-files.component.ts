import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import RepoService from 'app/services/repo.service';

@Component({
  selector: 'app-repo-files',
  templateUrl: './repo-files.component.html',
  styleUrls: ['./repo-files.component.css']
})
export class RepoFilesComponent implements OnInit {
	// reponame: string;
	// username: string;
	// allFiles: string[];
	// files: string[];
	// fileRoot: string;

	constructor(){
		// private repoService: RepoService, 
		// private router: Router,
		// private route: ActivatedRoute) {
			// this.files = [{type: 'dir', name: 'test'}, {type: 'file', name: 'another'}];
		// route.parent.

  	}

  ngOnInit() {
  }

}
