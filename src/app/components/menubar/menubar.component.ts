import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import UserService from 'app/services/user.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private router: Router
  ) { }

  logout(){
  	this.userService.logout(() => this.router.navigateByUrl('/'));
  }

  ngOnInit() {
  }

}
