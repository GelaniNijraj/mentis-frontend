import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuardService } from './services/dashboard-guard.service';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RepoComponent } from './components/repo/repo.component';
import { AllReposComponent } from './components/all-repos/all-repos.component';

const routes : Routes = [
	{path: '', component: DashboardComponent, children: [
		{path: 'dashboard', canActivate: [DashboardGuardService], component: DashboardHomeComponent},
		{path: 'settings', canActivate: [DashboardGuardService], component: SettingsComponent},
		{path: 'repo/new', canActivate: [DashboardGuardService], component: CreateRepoComponent},
		{path: 'repo/all', canActivate: [DashboardGuardService], component: AllReposComponent},
		{path: ':user/:repo', component: RepoComponent}
	]},
	{path: 'login', component: LoginComponent},
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
