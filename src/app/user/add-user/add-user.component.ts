import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  id!:number;
  @Input() user!:User;
  userForm : FormGroup = new  FormGroup({
    nom : new FormControl("",[Validators.required,Validators.minLength(3)]),
    prenom : new FormControl("", [Validators.required, Validators.minLength(3)]),
    pays : new FormControl(null,[Validators.required])

  });
  @Output() userAdded = new EventEmitter<User> ();
  @ViewChild('inputNom', {static: true }) inputNom!: ElementRef;
  @ViewChild('inputPrenom', {static: true }) inputPrenom!: ElementRef;
  @ViewChild('select', {static: true }) select!: ElementRef;
  constructor(private sr:UserService, private ar:ActivatedRoute){
   this.id = this.ar.snapshot.params['id']
   if  (this.id != undefined) {
    this.sr.getUserById(this.id).subscribe({
      next : (data) => {
        this.userForm.patchValue({
          nom : data.nom,
          prenom : data.prenom,
          pays : data.pays
        });
      } })}}

  getMessage(){
    return this.id != undefined ? 'Update user' : 'Add user'
  }
  
addUser(){
  const user : User = {
    id:0,
    nom: this.inputNom.nativeElement.value,
    prenom: this.inputPrenom.nativeElement.value,
    pays:this.select.nativeElement.value
    
  }
  this.userAdded.emit(user);
  
}

}