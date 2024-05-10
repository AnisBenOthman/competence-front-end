import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Affectation } from 'src/app/core/models/affectation.model';
import { AffectationService } from 'src/app/core/services/affectation.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  affectations:Affectation[] = [];
  alert = 0;
  message = "";
  arrayUpdate : Affectation[] = [];
  constructor(private dataService: UserService, private ar: ActivatedRoute, private affectationService: AffectationService) {
    this.getUserById();
    this.getAffectationbyUser();
    
  
  }
  ngOnInit(): void {
    this.getUserById
    
  }
  
  
  
  getUserById(){
    this.dataService.getUserById(this.ar.snapshot.params['id']).subscribe({
      next : (data) => {
        this.user = data;
        this.getAffectationbyUser},
      error : (err) => alert(err.message),
    }) 
  }
  getAffectationbyUser(){
    this.affectationService.getAffectationByUser(this.ar.snapshot.params["id"]).subscribe({
      next: (data) => {
        this.affectations=data;
        console.log(this.affectations)
        },
      error: (e) => {
        this.alert = 2;
        this.message = e.message;
      }
    })
  } 
  updateUser(body:User){
    this.dataService.updateUser(this.ar.snapshot.params["id"], body).subscribe({
      next : (data : any) => { 
        this.alert = 1;
        this.message = body.nom + " " +  body.prenom + " " +data.Message;
        this.updateAffectation(this.arrayUpdate)},
      error : (err)=> {
        this.alert = 2;
        this.message = err.message;
      }
    })
    
  }

    getDataAffectation(data : any){
      this.arrayUpdate = data
      
    }

    addAffectation(data : any){
    
      this.affectationService.addAffectation(this.ar.snapshot.params["id"],data.competence.id,{niveau:data.niveau}).subscribe({
        next: (data : any) => {
          console.log(data)
          if(data.error){
            this.alert = 2;
            this.message = data.error
          }else {
            this.alert = 1;
            this.message = `${data.competence} add successfully`
          } 
          
        },
        error: (error) => {
          this.alert = 2;
          this.message = error.message;
        }
      })
      setTimeout(() => this.getAffectationbyUser() ,2000);
    }

    declare(data : any){
this.message = data.message,
this.alert = data.alert
    }
    updateAffectation(data : any){
      if(data.length > 0){
        for (let i=0; i < data.length; i++){
          this.affectationService.updateAffectationEmploye(data[i].id,{ niveau : data[i].niveau}).subscribe({
            next:(d) => console.log(d),
            error:(erreur) => alert(erreur.message)
          })
        }
      }
    }
}
