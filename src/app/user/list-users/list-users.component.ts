import { Component, DoCheck, OnInit } from '@angular/core';
import {User} from  '../user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit  {
  users !: User[] 
  id!:number
  constructor(private lu:UserService, private ar:ActivatedRoute){
    this.id = this.ar.snapshot.params['id']
  }
  refraicher(){
    this.lu.getUsers().subscribe({
      next: (data) => this.users = data,
      error:(erro)=> {
        alert(erro.message);
        console.log(erro);
      },
    })
  }
  ngOnInit(): void {
    this.refraicher();
  }
  
  onUserAdd(user:User){
    
    this.lu.addUser(user).subscribe({
      next: () => alert({msg:`Utilisateur ajouté`}),
      error: err=> alert(err.message)
    })
    
    setTimeout(() => this.refraicher(),3000);
   
}
delete(id: number){
  this.lu.deleteUser(id).subscribe({
    next:()=> {
      alert('delete successfully')
    this.users = this.users.filter(obj => obj.id != id )},
    error:(err) => alert(err.message)
})
}
}
