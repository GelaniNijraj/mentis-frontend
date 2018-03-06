import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import RepoService from 'app/services/repo.service';

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
	parent: string;

	constructor(
		private repoService: RepoService, 
		private router: Router,
		private route: ActivatedRoute) {
		route.parent.params.subscribe(params => {
			this.reponame = params.repo;
			this.username = params.user;
			// let t = this.router.url.split('/').splice(4).join('/');
			this.route.params.subscribe(q => {
				this.current = q.path == undefined ? '' : q.path;
				let tmp = this.current.split('/');
				this.parent = tmp.splice(0, tmp.length - 1).join('/');
				repoService.getFiles(params.user, params.repo, q.path).subscribe((res: any) => {
					this.files = res.files;
				});
				repoService.getInfo(params.user, params.repo).subscribe((res: any) => {
					this.info = res.data;
				});
			});
			// try{
			// }catch(e){
			// 	console.log(e.message);
			// }
		});
	}

	setRoot(root: string) {
		console.log(root);
	}

	displayFiles() {
		this.files = this.allFiles
			.map(x => x.startsWith(this.fileRoot) ? x.substr(x.search('/') + 1, x.length) : undefined)
			.filter(x => x != undefined);
	}

	updatePath(path: string){
		console.log(path);
	}

	ngOnInit() {
	}

}
