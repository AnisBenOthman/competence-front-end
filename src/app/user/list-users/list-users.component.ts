import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users!: User[];
  id!: number;
  alert = 0;
  message: string = '';
  search = new FormControl('', [Validators.pattern('^[a-zA-Z ]+$')]);
  paysSelectionne = new FormControl('');
  paysFiltre: string[] = [];

  constructor(
    private lu: UserService,
    private ar: ActivatedRoute,
    public dl: MatDialog
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.getPays();
  }
  refraicher() {
    this.lu.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (erro) => {
        alert(erro.message);
        console.log(erro);
      },
    });
  }
  ngOnInit(): void {
    this.refraicher();
  }

  onUserAdd(user: User) {
    this.lu.addUser(user).subscribe({
      next: () => {
        this.message = `user ${user.nom} ${user.prenom} has been successfully added `;
        this.alert = 1;
      },
      error: (err) => {
        (this.message = err.message), (this.alert = 2);
      },
    });

    setTimeout(() => this.refraicher(), 3000);
  }
  delete(user: User) {
    let dialogRef = this.dl.open(AlertComponent, { data: { name: user.nom } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.lu.deleteUser(user.id).subscribe({
          next: () => {
            this.alert = 1;
            this.message = `${user.nom} ${user.prenom} has been deleted successfully`;
            this.users = this.users.filter((obj) => obj.id != user.id);
          },
          error: (err) => {
            this.alert = 2;
            this.message = err.message;
          },
        });
      }
    });
  }
  searchUser() {
    let searchTerm: string = this.search.value ?? '';
    if (searchTerm !== '') {
      this.lu.searchUserByName(searchTerm).subscribe({
        next: (data) => {
          this.users = data;
          if (data.length == 0) {
            this.message = 'No users found';
          }
        },
        error: (err) => alert(err.message),
      });
    } else {
      this.refraicher();
    }
  }
  getPays() {
    this.lu.filtrePays().subscribe({
      next: (data) => {
        this.paysFiltre = data;
        console.log(this.paysFiltre);
      },
      error: (e) => alert(e.message),
    });
  }
  filtrePays() {
    this.lu.getUserByPays({ pays: this.paysSelectionne.value }).subscribe({
      next: (data) => {
        console.log(this.paysSelectionne.value);
        this.users = data;
        console.log(this.users);
      },
      error: (err) => alert(err.message),
    });
  }
  test(id: User) {
    console.log(id);
  }
}
