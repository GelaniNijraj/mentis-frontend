import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distanceInWordsToNow } from 'date-fns';
declare var $ : any;

import IssueService from 'app/services/issue.service';
import UserService from 'app/services/user.service';
import Issue from 'app/models/Issue';
import IssueReply from 'app/models/IssueReply';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, AfterViewInit {

	issue: Issue;
	username: string;
	reponame: string;
  issueId: string;
  err: string;
  setup = false;
  isOwner = false;
  labels = [];
  assignedLabels = [];
  labelResults = [];
  baseUrl = 'http://127.0.0.1:3000/api';

  constructor(
  	private issueService: IssueService,
  	private router: Router,
    private userService: UserService,
  	private route: ActivatedRoute) {

    setTimeout(() => {
      console.log('ta');
      $('#addlabel').popup({
        inline: true,
        hoverable: true,
        position: 'bottom left'
      });
    }, 3000);
  	route.parent.params.subscribe(params => {
  		this.username = params.user;
  		this.reponame = params.repo;
  		route.params.subscribe(p => {
        this.issueId = p.id;
        // issue thread
  			this.issueService.get(this.username, this.reponame, this.issueId).subscribe((res: any) => {
  				if(res.success){
  					this.issue = res.issue;
            this.isOwner = res.isOwner;
            this.assignedLabels = this.issue.labels;
  				}else{
  					router.navigateByUrl([this.username, this.reponame, 'issues'].join('/'));
  				}
  			});
        // all labels for search
        this.issueService.allLabels(this.username, this.reponame).subscribe((res: any) => {
          if(res.success){
            this.labels = res.labels;
            this.updateLabels('');
          }
        });
  		})
  	});
  }

  ago(date: Date){
    return distanceInWordsToNow(date) + ' ago';
  }

  submitReply(reply: HTMLInputElement){
    let r = reply.value.trim();
    if(r.length > 0){
      let iss = new Issue();
      iss.username = this.username;
      iss.reponame = this.reponame;
      iss.id = this.issueId;
      let isr = new IssueReply();
      isr.description = r;
      isr.from = this.userService.getUser();
      isr.postedOn = new Date();
      this.issue.replies.push(isr);
      this.issueService.reply(iss, r).subscribe((res: any) => {
        if(res.success)
          reply.value = "";
      });
    }else{
      this.err = "Please complete all the fields...";
    }
  }

  createLabel(value){
    value = value.trim();
    if(value.length > 1){
      this.labels.push({
        title: value
      });
      this.issueService.createLabel(this.username, this.reponame, value).subscribe((res: any) => {
        this.updateLabels(value);
        if(!res.success)
          this.labels.pop();
      });
    }
    return false;
  }

  ngAfterViewInit() {
  }


  updateLabels(value){
    this.labelResults = this.labels.filter(l => l.title.startsWith(value)).splice(0, 3);
  }

  assignLabel(title){
    this.assignedLabels.push({title: title});
    this
      .issueService
      .assignLabel(this.username, this.reponame, this.issueId, title).subscribe((res: any) => {
        if(!res.success)
          this.assignedLabels.pop();
      });
  }

  resignLabel(title){
    let saved = -1;
    let tmp = this.assignedLabels;
    tmp.find((el, i) => {
      if(el.title == title){
        this
          .issueService
          .resignLabel(this.username, this.reponame, this.issueId, title).subscribe((res: any) => {
            if(!res.success)
              this.assignedLabels.push({title: title});
          });
        if(i + 1 < tmp.length)
          tmp = tmp.slice(0, i).concat(tmp.slice(i + 1, tmp.length));
        else
          tmp = tmp.slice(0, i);
        this.assignedLabels = tmp;
        return true;
      }
    })
    return false;
  }

  closeIssue(){
    this.issue.open = false;
    this.issueService.close(this.username, this.reponame, this.issueId).subscribe((res: any) => {
      if(!res.success)
        this.issue.open = true;
    });
  }

  openIssue(){
    this.issue.open = true;
    this.issueService.open(this.username, this.reponame, this.issueId).subscribe((res: any) => {
      if(!res.success)
        this.issue.open = false;
    });
  }

  ngOnInit() {

  }

}
