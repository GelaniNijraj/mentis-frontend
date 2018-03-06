import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';

import { DashboardGuardService } from './services/dashboard-guard.service';
import UserService from './services/user.service';
import RepoService from './services/repo.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { SettingsComponent } from './components/settings/settings.component';
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
import { IssueComponent } from './issue/issue.component';

@NgModule({
	declarations: [
	AppComponent,
	LoginComponent,
	HomeComponent,
	DashboardComponent,
	CreateRepoComponent,
	SettingsComponent,
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
	IssueComponent
	],
	imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule
	],
	providers: [DashboardGuardService, UserService, CookieService, RepoService],
	bootstrap: [AppComponent]
})
export class AppModule { }
