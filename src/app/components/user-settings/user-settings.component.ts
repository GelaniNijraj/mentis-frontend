import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import UserService from 'app/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  passmessage = '';
  passsuccess = false;

  aboutmsg = '';
  aboutsuc = false;
  about = '';

  picmsg = '';
  picsuc = false;

  username: string;

  constructor(
  	private route: ActivatedRoute,
  	private userService: UserService
  ) {
  	route.params.subscribe((params) => {
  		this.username = params.user;
  		this.userService.profile(this.username).subscribe((res: any) => {
  			if(res.success)
  				this.about = res.about;
  		})
  	});
  }

  updatePassword(button: HTMLInputElement, oldpass: HTMLInputElement, newpass: HTMLInputElement){
  	button.disabled = true;
  	let soldpass = oldpass.value.trim();
  	let snewpass = newpass.value.trim();
  	if(soldpass.length > 0 && snewpass.length > 0){
  		this.userService.changePassword(this.username, soldpass, snewpass).subscribe((res: any) => {
  			button.disabled = false;
  			if(res.success){
  				this.passmessage = 'update successfully';
  				this.passsuccess = true;
  			}else{
  				res.passsuccess = false;
  				if(res.message)
  					this.passmessage = res.message;
  				else
  					this.passmessage = 'something went wrong';
  			}
  		});
  	}else{
  		this.passsuccess = false;
  		this.passmessage = 'please complete all the fields';
  	}
  }

  updateAboutMe(button: HTMLInputElement, about: HTMLInputElement){
  	let sabout = about.value.trim();
  	button.disabled = true;
  	if(sabout.length <= 255){
  		this.userService.changeAbout(this.username, sabout).subscribe((res: any) => {
  			button.disabled = false;
  			this.aboutsuc = res.success;
  			if(res.success)
  				this.aboutmsg = 'updated successfully';
  			else
  				this.aboutmsg = 'something went wrong...';
  		});
  	}else{
  		button.disabled = false;
  		this.aboutsuc = false;
  		this.aboutmsg = 'Maximum 255 characters allowed';
  	}
  }

  updateProfilePic(picbtn: HTMLInputElement, file: HTMLInputElement){
  	picbtn.disabled = true;
  	this.userService.changeProfilePic(this.username, file).subscribe((res: any) => {
  		if(res.success){
  			this.picsuc = true;
  			this.picmsg = 'update successfully';
  		}else{
  			this.picsuc = false;
  			this.picmsg = 'something went wrong...';
  		}
  		picbtn.disabled = false;
  	});
  }

  ngOnInit() {
  }

}
