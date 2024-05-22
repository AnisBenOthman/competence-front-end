import { Component } from '@angular/core';
import { Competence } from '../competence.model';
import { ActivatedRoute } from '@angular/router';
import { CompetenceService } from 'src/app/core/services/competence.service';
import { Affectation } from 'src/app/core/models/affectation.model';
import { AffectationService } from 'src/app/core/services/affectation.service';

@Component({
  selector: 'app-competence-detail',
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.css']
})
export class CompetenceDetailComponent {
id!:number;
competence!:Competence;
affectations !: Affectation[]

constructor(private ar:ActivatedRoute, private sr:CompetenceService, private as : AffectationService) {
  this.id = this.ar.snapshot.params['id'];
  this.sr.getCompetenceById(this.ar.snapshot.params['id']).subscribe({
    next: (data) => 
      this.competence = data,
      
    error: (err) => alert(err.message)
  });

  this.as.getAffectationbyCompetence(this.id).subscribe({
    next: (data) => this.affectations = data,
    error : (err) => alert(err.message)
  })
  
}

}
