import { Component, Input } from '@angular/core';
import { ChartConfiguration, Ticks } from 'chart.js';
import { Affectation } from '../core/models/affectation.model';
import { AffectationService } from '../core/services/affectation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent {
  title = "radar de compétence";
  o !: any;
  affectations: any[] = [];
  competencesName : string[] = [] 
  niveau : number[] = []
  id !: number
constructor(private affectationService : AffectationService, private ar: ActivatedRoute, private dataService: UserService){
  this.getAffectationbyUser();
}


  radarChartOptions: ChartConfiguration<'radar'>['options']= {
    responsive: true, scales : { r : { suggestedMin : 0, suggestedMax :3}}
  }
  radarChartLabels : string[] = [];
  radarChartDatasets : ChartConfiguration<'radar'>['data']['datasets'] = [{data : this.niveau, label: `Competence here`, borderWidth : 1} ]
  getAffectationbyUser(){
    this.id = this.ar.snapshot.params["id"];
    if(this.id){
      this.affectationService.getAffectationByUser(this.ar.snapshot.params["id"]).subscribe({
        next: (data : any) => {
          this.affectations=data;
          data.map((o : any) => {
            this.competencesName.push(o.competence)
          this.niveau.push(o.niveau)})
          console.log(this.competencesName)
          this.radarChartLabels = this.competencesName;
          
          },
        error: (e) => alert(e.message)
      })
    } else {
      this.affectationService.getCompetenceTeam().subscribe({
        next : (data) => {
          console.log(data);
          data.map((o : any) => {
            this.competencesName.push(o.competence)
          this.niveau.push(o.moyenne)})
          console.log(this.competencesName)
          console.log(this.niveau)
          this.radarChartLabels = this.competencesName;
          
          },
        error: (e) => alert(e.message)
      })
    }
    
  } 
 
}
