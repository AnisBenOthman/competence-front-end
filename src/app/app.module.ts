import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { UserComponent } from './user/user.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CompetenceComponent } from './competence/competence.component';
import { ListCompetenceComponent } from './competence/list-competence/list-competence.component';
import { AddCompetenceComponent } from './competence/add-competence/add-competence.component';
import { NotFoundComponent } from './shared//not-found/not-found.component';
import { HomeComponent } from './shared//home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AffectationComponent } from './affectation/affectation.component';
import { AddAffectationComponent } from './affectation/add-affectation/add-affectation.component';
import { ListAffectationComponent } from './affectation/list-affectation/list-affectation.component';
import { UserService } from './core/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CompetenceDetailComponent } from './competence/competence-detail/competence-detail.component';
import { AlertComponent } from './shared/alert/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserComponent,
    ListUsersComponent,
    AddUserComponent,
    UserDetailComponent,
    CompetenceComponent,
    ListCompetenceComponent,
    AddCompetenceComponent,
    NotFoundComponent,
    HomeComponent,
    AffectationComponent,
    AddAffectationComponent,
    ListAffectationComponent,
    CompetenceDetailComponent,
    AlertComponent,
  ],
  entryComponents: [AlertComponent],
  imports: [
    BrowserModule,
    //pour activer le routing
    AppRoutingModule,
    //pour activer [(ngModel)]
    FormsModule,
    //pour activer [formGroup] et les validations de formulaire
    ReactiveFormsModule,
    //pour activer le service des api via http
    HttpClientModule,
    BrowserAnimationsModule,
    //module angular material
    MaterialModule
  ],
  providers: [], //service
  bootstrap: [AppComponent]
})
export class AppModule { }
