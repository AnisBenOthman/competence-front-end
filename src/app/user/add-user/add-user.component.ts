import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  id!: number;
  paysList: string[] = [];
  nomUser!: string;
  @Input() user!: User;
  userForm: FormGroup = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    pays: new FormControl('', [Validators.required]),
  });
  @Output() userAdded = new EventEmitter<User>();
  @ViewChild('inputNom', { static: true }) inputNom!: ElementRef;
  @ViewChild('inputPrenom', { static: true }) inputPrenom!: ElementRef;
  @ViewChild('select', { static: true }) select!: ElementRef;
  row: any;

  constructor(private sr: UserService, private ar: ActivatedRoute) {
    this.id = this.ar.snapshot.params['id'];
    this.sr.getPays().subscribe({
      next: (data) => {
        data.map((obj: any) => {
          this.paysList.push(obj.name.common);
        });
        this.paysList.sort();
      },
      error: (e) => alert(e.message),
    });

    if (this.id != undefined) {
      this.sr.getUserById(this.id).subscribe({
        next: (data) => {
          this.userForm.patchValue({
            nom: data.nom,
            prenom: data.prenom,
            pays: data.pays,
          });
          this.nomUser = data.nom;
        },
        error: (err) => alert(err.message),
      });
    }
  }

  getMessage() {
    return this.id != undefined ? 'Update user' : 'Add user';
  }

  addUser() {
    const user: User = {
      id: 0,
      nom: this.userForm.get('nom')!.value.toLowerCase(),
      prenom: this.userForm.get('prenom')!.value.toLowerCase(),
      pays: this.userForm.get('pays')!.value.toLowerCase(),
    };
    if (this.id == undefined) {
      this.userForm.reset();
    }
    this.userAdded.emit(user);
    this.nomUser = user.nom;
  }
}
