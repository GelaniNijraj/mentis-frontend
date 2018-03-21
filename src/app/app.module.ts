import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';

import { DashboardGuardService } from './services/dashboard-guard.service';
import UserService from './services/user.service';
import RepoService from './services/repo.service';
import IssueService from './services/issue.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { RepoComponent } from './components/repo/repo.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { AllReposComponent } from './components/all-repos/all-repos.component';
import { RegisterComponent } from './components/register/register.component';
import { RepoSettingsComponent } from './components/repo-settings/repo-settings.component';
import { RepoCodeComponent } from './components/repo-code/repo-code.component';
import { RepoIssuesComponent } from './components/repo-issues/repo-issues.component';
import { RepoFilesComponent } from './components/repo-files/repo-files.component';
import { FooterComponent } from './components/footer/footer.component';
import { IssueCreateComponent } from './components/issue-create/issue-create.component';
import { IssueComponent } from './components/issue/issue.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReposComponent } from './components/user-repos/user-repos.component';
import { UserStarsComponent } from './components/user-stars/user-stars.component';
import { IssueLabelsComponent } from './components/issue-labels/issue-labels.component';
import { RepoShowcaseComponent } from './components/repo-showcase/repo-showcase.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

@NgModule({
	declarations: [
	AppComponent,
	LoginComponent,
	HomeComponent,
	DashboardComponent,
	CreateRepoComponent,
	RepoComponent,
	DashboardHomeComponent,
	MenubarComponent,
	AllReposComponent,
	RegisterComponent,
	RepoSettingsComponent,
	RepoCodeComponent,
	RepoIssuesComponent,
	RepoFilesComponent,
	FooterComponent,
	IssueCreateComponent,
	IssueComponent,
	UserProfileComponent,
	UserReposComponent,
	UserStarsComponent,
	IssueLabelsComponent,
	RepoShowcaseComponent,
	UserSettingsComponent
	],
	imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule
	],
	providers: [DashboardGuardService, UserService, CookieService, RepoService, IssueService],
	bootstrap: [AppComponent]
})
export class AppModule { }
