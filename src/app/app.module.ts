import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { DashboardGuardService } from './services/dashboard-guard.service';
import UserService from './services/user.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RepoComponent } from './components/repo/repo.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    CreateRepoComponent,
    SettingsComponent,
    RepoComponent,
    DashboardHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DashboardGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
