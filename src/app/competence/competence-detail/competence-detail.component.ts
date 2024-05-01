import { Component } from '@angular/core';
import { Competence } from '../competence.model';
import { ActivatedRoute } from '@angular/router';
import { CompetenceService } from 'src/app/core/services/competence.service';

@Component({
  selector: 'app-competence-detail',
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.css']
})
export class CompetenceDetailComponent {
id!:number;
competence!:Competence;

constructor(private ar:ActivatedRoute, private sr:CompetenceService) {
  this.sr.getCompetenceById(this.ar.snapshot.params['id']).subscribe({
    next: (data) => 
      this.competence = data,
      
    error: (err) => alert(err.message)
  });
  
}

}
