import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuardService } from './services/dashboard-guard.service';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes : Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{
		path: 'dashboard', 
		component: DashboardComponent,
		canActivate: [DashboardGuardService],
		children: [
			{path: 'home', component: HomeComponent}
		]
	}
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
