import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuardService } from './services/dashboard-guard.service';

import { HomeComponent }			from './components/home/home.component';
import { DashboardComponent } 		from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } 	from './components/dashboard-home/dashboard-home.component';
import { LoginComponent } 			from './components/login/login.component';
import { CreateRepoComponent } 		from './components/create-repo/create-repo.component';
import { RepoComponent } 			from './components/repo/repo.component';
import { AllReposComponent } 		from './components/all-repos/all-repos.component';
import { RegisterComponent } 		from './components/register/register.component';
import { RepoSettingsComponent } 	from './components/repo-settings/repo-settings.component';
import { RepoCodeComponent } 		from './components/repo-code/repo-code.component';
import { RepoIssuesComponent } 		from './components/repo-issues/repo-issues.component';
import { RepoFilesComponent } 		from './components/repo-files/repo-files.component';
import { IssueCreateComponent } 	from './components/issue-create/issue-create.component';
import { IssueComponent }			from './components/issue/issue.component';
import { UserProfileComponent } 	from './components/user-profile/user-profile.component';
import { UserReposComponent } 		from './components/user-repos/user-repos.component';
import { UserStarsComponent } 		from './components/user-stars/user-stars.component';
import { UserSettingsComponent } 		from './components/user-settings/user-settings.component';
import { IssueLabelsComponent } 	from './components/issue-labels/issue-labels.component';	

const routes : Routes = [
	{path: '', component: DashboardComponent, children: [
		{path: 'dashboard', canActivate: [DashboardGuardService], component: DashboardHomeComponent},
		{path: 'repo/new', canActivate: [DashboardGuardService], component: CreateRepoComponent},
		{path: 'repo/all', canActivate: [DashboardGuardService], component: AllReposComponent},

		{path: 'user/:user', component: UserProfileComponent},
		{path: 'user/:user/repos', component: UserReposComponent},
		{path: 'user/:user/stars', component: UserReposComponent},
		{path: 'user/:user/settings', canActivate: [DashboardGuardService], component: UserSettingsComponent},

		{path: ':user/:repo', component: RepoComponent, children: [
			{path: '', redirectTo: 'code', pathMatch: 'full'},
			{path: 'code', component: RepoCodeComponent},
			{path: 'issues', component: RepoIssuesComponent},
			{path: 'issues/labels', component: IssueLabelsComponent},
			{path: 'issues/create', component: IssueCreateComponent},
			{path: 'issues/label/:label', component: RepoIssuesComponent},
			{path: 'issues/:id', component: IssueComponent},
			{path: 'settings', canActivate: [DashboardGuardService], component: RepoSettingsComponent},
		]}
	]},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: '**', component: LoginComponent}
];

@NgModule({
	imports: [
	CommonModule,
	RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
