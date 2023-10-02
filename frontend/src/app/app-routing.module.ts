import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { TeamsComponent } from './teams/teams.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'company', component: CompanyComponent },
  {
    path: 'company/:companyId/announcement',
    component: AnnouncementsComponent,
  },
  { path: 'company/:companyId/teams', component: TeamsComponent },
  {
    path: 'company/:companyId/teams/:teamId/projects',
    component: ProjectsComponent,
  },
  {
    path: 'company/:companyId/user-registry',
    component: UserRegistryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
