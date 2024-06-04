import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Competence } from '../competence.model';
import { ActivatedRoute } from '@angular/router';
import { CompetenceService } from 'src/app/core/services/competence.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css'],
})
export class AddCompetenceComponent {
  @Input() competence!: Competence;
  alert: number = 0;
  message!: string;
  @Output() addLibelle = new EventEmitter<Competence>();
  libelle: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  id!: number;
  constructor(private ar: ActivatedRoute, private cs: CompetenceService) {
    this.id = ar.snapshot.params['id'];
    if (this.id != undefined) {
      this.cs.getCompetenceById(this.id).subscribe({
        next: (data) => {
          this.libelle.patchValue(data.libelle);
        },
        error: (err) => alert(err.message),
      });
    }
  }

  addCompetence() {
    const competence: Competence = {
      id: 0,
      libelle: this.libelle.value ?? '',
    };
    this.addLibelle.emit(competence);
    this.libelle.reset();
  }
  updateCompetence() {
    this.cs
      .updateCompetence(this.id, { libelle: this.libelle.value })
      .subscribe({
        next: (data) => {
          this.alert = 1;
          this.message = `${this.libelle.value} updated successfully`;
        },
        error: (err) => {
          this.alert = 2;
          this.message = err.message;
        },
      });
  }
}
