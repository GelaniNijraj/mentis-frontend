import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuardService } from './services/dashboard-guard.service';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RepoComponent } from './components/repo/repo.component';

const routes : Routes = [
	{path: '', component: HomeComponent, children: [
		{path: 'login', component: LoginComponent}
	]},
	{
		path: 'dashboard', 
		component: DashboardComponent,
		// canActivate: [DashboardGuardService],
		children: [
			{path: 'home', component: HomeComponent},
			{path: 'settings', component: SettingsComponent},
			{path: 'create/repo', component: CreateRepoComponent}
		]
	},
	{path: ':user/:repo', component: RepoComponent}
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
