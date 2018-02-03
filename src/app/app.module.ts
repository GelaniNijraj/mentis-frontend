import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { DashboardGuardService } from './services/dashboard-guard.service';
import { UserService } from './services/user.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DashboardGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
