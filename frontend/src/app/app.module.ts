import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { CompanyComponent } from './company/company.component';
import { ModalComponent } from './modal/modal.component';
import { DataService } from './data.service';
import { AnnouncementOverlayComponent } from './Components/announcement-overlay/announcement-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AnnouncementsComponent,
    TeamsComponent,
    ProjectsComponent,
    UserRegistryComponent,
    CompanyComponent,
    ModalComponent,
    AnnouncementOverlayComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
