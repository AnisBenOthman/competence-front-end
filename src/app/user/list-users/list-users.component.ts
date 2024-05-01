import { Component, DoCheck, OnInit } from '@angular/core';
import {User} from  '../user.model';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit  {
  users !: User[] 
  constructor(private lu:UserService){
    
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
      next: () => console.log(`Utilisateur ajouté`),
      error: err=> alert(err.message)
    })
    setTimeout(() => this.refraicher(),3000);
    
  }
}

  


