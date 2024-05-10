import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CompetenceComponent } from './competence/competence.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './shared/home/home.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CompetenceDetailComponent } from './competence/competence-detail/competence-detail.component';
import { RadarComponent } from './radar/radar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'user',
    children: [
      { path: '', component: UserComponent},
      { path: ':id', component: UserDetailComponent }
    ]
  },
  {
    path: 'competence',
    children: [
      { path: '', component: CompetenceComponent},
      { path: ':id', component: CompetenceDetailComponent }
    ]
  },
  { path: 'home', component: HomeComponent },
  {path : 'radar', component : RadarComponent},
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
