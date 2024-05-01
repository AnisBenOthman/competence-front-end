import { Component, Input } from '@angular/core';
import { Competence } from '../competence.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css']
})
export class AddCompetenceComponent {
@Input() competence!:Competence;
id!: number
constructor(private ar : ActivatedRoute ) {
this.id = ar.snapshot.params['id'];
}
}
