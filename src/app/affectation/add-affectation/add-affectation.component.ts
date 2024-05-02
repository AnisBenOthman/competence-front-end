import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Competence } from 'src/app/competence/competence.model';
import { CompetenceService } from 'src/app/core/services/competence.service';

@Component({
  selector: 'app-add-affectation',
  templateUrl: './add-affectation.component.html',
  styleUrls: ['./add-affectation.component.css']
})
export class AddAffectationComponent {
  competences!:Competence[];
  affectionForm: FormGroup = new FormGroup({
    competence : new FormControl('', [Validators.required]),
    niveau : new FormControl(1,[Validators.required])
  })
  @Output() addCompetence = new EventEmitter<{competence : string, niveau : number}>
  constructor(private sr:CompetenceService){
    this.sr.getAllCompetences().subscribe({
      next: (data) => this.competences = data,
      error:(erreur)=> alert(erreur.message)
    })

  }
  onSubmit(){
    this.addCompetence.emit({
      competence : this.affectionForm.get('competence')!.value,
      niveau : this.affectionForm.get('niveau')!.value
    });
    this.affectionForm.reset();
    
    
  }

}
