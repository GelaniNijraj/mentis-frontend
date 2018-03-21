import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import IssueService from 'app/services/issue.service';

@Component({
  selector: 'app-issue-labels',
  templateUrl: './issue-labels.component.html',
  styleUrls: ['./issue-labels.component.css']
})
export class IssueLabelsComponent implements OnInit {

	labels = [];
	username: string;
	reponame: string;

  constructor(
  	private issueService: IssueService,
  	private route: ActivatedRoute) {
  	route.parent.params.subscribe((params) => {
  		this.username = params.user;
  		this.reponame = params.repo;
  		issueService.allLabels(params.user, params.repo).subscribe((res: any) => {
  			if(res.success)
  				this.labels = res.labels;
  		});
  	});
  }

  createLabel(name: HTMLInputElement){
  	let n = name.value.trim();
  	if(n.length > 1){
  		this.labels.push({
  			title: n
  		});
  		this.issueService.createLabel(this.username, this.reponame, n).subscribe((res: any) => {
  			if(!res.success)
  				this.labels.pop();
  		});
  	}
  	return false;
  }

  deleteLabel(name: string){
    let tmp = this.labels;
    tmp.find((el, i) => {
      if(el.title == name){
        this
          .issueService
          .deleteLabel(this.username, this.reponame, name).subscribe((res: any) => {
            if(!res.success)
              this.labels.push({title: name});
          });
        if(i + 1 < tmp.length)
          tmp = tmp.slice(0, i).concat(tmp.slice(i + 1, tmp.length));
        else
          tmp = tmp.slice(0, i);
        this.labels = tmp;
        return true;
      }
    })
    return false;
  }

  ngOnInit() {
  }

}
