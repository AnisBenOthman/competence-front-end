import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Affectation } from 'src/app/core/models/affectation.model';
import { AffectationService } from 'src/app/core/services/affectation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user!: User;
  affectations!:Affectation[];
  constructor(private dataService: UserService, private ar: ActivatedRoute, private affectationService: AffectationService) {
    this.getUserById();
    this.getAffectationbyUser();
  
  }
  
  getUserById(){
    this.dataService.getUserById(this.ar.snapshot.params['id']).subscribe({
      next : (data) => this.user = data,
      error : (err) => alert(err.message),
    }) 
  }
  getAffectationbyUser(){
    this.affectationService.getAffectationByUser(this.ar.snapshot.params["id"]).subscribe({
      next: (data) => this.affectations=data ,
      error: (e) => alert(e.message)
    })
  } 
  updateUser(body:User){
    this.dataService.updateUser(this.ar.snapshot.params["id"], body).subscribe({
      next : (data) => {alert({
        msg : "update successfuly",
      });
      console.log('update succes')},
      error : (err)=>alert(err.message)
    })}

    addAffectation(data : any){
      console.log(data);
      this.affectationService.addAffectation(this.ar.snapshot.params["id"],data.competence.id,{niveau:data.niveau}).subscribe({
        next: (data) => alert("add successfuly"),
        error: (error) => alert(error.message)
      })
      setTimeout(() => this.getAffectationbyUser() ,2000);
    }

}
