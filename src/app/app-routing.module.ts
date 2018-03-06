import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuardService } from './services/dashboard-guard.service';

import { HomeComponent }			from './components/home/home.component';
import { DashboardComponent } 		from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } 	from './components/dashboard-home/dashboard-home.component';
import { LoginComponent } 			from './components/login/login.component';
import { CreateRepoComponent } 		from './components/create-repo/create-repo.component';
import { SettingsComponent } 		from './components/settings/settings.component';
import { RepoComponent } 			from './components/repo/repo.component';
import { AllReposComponent } 		from './components/all-repos/all-repos.component';
import { RegisterComponent } 		from './components/register/register.component';
import { RepoSettingsComponent } 	from './components/repo-settings/repo-settings.component';
import { RepoCodeComponent } 		from './components/repo-code/repo-code.component';
import { RepoIssuesComponent } 		from './components/repo-issues/repo-issues.component';
import { RepoFilesComponent } 		from './components/repo-files/repo-files.component';
import { IssueCreateComponent } 	from './components/issue-create/issue-create.component';

const routes : Routes = [
	{path: '', component: DashboardComponent, children: [
		{path: 'dashboard', canActivate: [DashboardGuardService], component: DashboardHomeComponent},
		{path: 'settings', canActivate: [DashboardGuardService], component: SettingsComponent},
		{path: 'repo/new', canActivate: [DashboardGuardService], component: CreateRepoComponent},
		{path: 'repo/all', canActivate: [DashboardGuardService], component: AllReposComponent},
		{path: ':user/:repo', component: RepoComponent, children: [
			{path: '', redirectTo: 'code', pathMatch: 'full'},
			{path: 'code', component: RepoCodeComponent},
			{path: 'issues', component: RepoIssuesComponent},
			{path: 'issues/create', component: IssueCreateComponent},
			{path: 'settings', component: RepoSettingsComponent},
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
