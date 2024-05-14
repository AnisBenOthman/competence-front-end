import { Component, OnInit } from '@angular/core';
import { Competence } from '../competence.model';
import { CompetenceService } from 'src/app/core/services/competence.service';

@Component({
  selector: 'app-list-competence',
  templateUrl: './list-competence.component.html',
  styleUrls: ['./list-competence.component.css']
})
export class ListCompetenceComponent  {
  competences!:Competence[]; 
  alert = 0;
  message = "";
  constructor(private cs : CompetenceService){
    this.refresh();
  }
  
  refresh(){
    this.cs.getAllCompetences().subscribe({
      next: (data) => 
        this.competences = data,
        
      
      error: (err) => alert(err.message)
    })
  }
  addCompetence(c : Competence){
    this.cs.addCompetence(c).subscribe({
      next: (d ) => {
        this.alert = 1;
        this.message = c.libelle + " " + " was added successfully"; 
      },
      error : (err) => {
        this.alert = 2;
        this.message = err.message;
      }
    })
    setTimeout(() => this.refresh(),3000);
  }

}
