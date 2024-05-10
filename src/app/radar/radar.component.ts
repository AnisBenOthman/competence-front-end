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
constructor(private affectationService : AffectationService, private ar: ActivatedRoute, private dataService: UserService){
  this.getAffectationbyUser();
  this.getUserById();
}
getUserById(){
  this.dataService.getUserById(this.ar.snapshot.params['id']).subscribe({
    next : (data) => {
      this.o = data;
      console.log(this.o)
      
    },
    error : (err) => alert(err.message),
  }) 
}

  radarChartOptions: ChartConfiguration<'radar'>['options']= {
    responsive: true, scales : { r : { suggestedMin : 0, suggestedMax :3}}
  }
  radarChartLabels : string[] = [];
  radarChartDatasets : ChartConfiguration<'radar'>['data']['datasets'] = [{data : this.niveau, label: `Competence here`, borderWidth : 1} ]
  getAffectationbyUser(){
    this.affectationService.getAffectationByUser(this.ar.snapshot.params["id"]).subscribe({
      next: (data : any) => {
        this.affectations=data;
        data.map((o : any) => {
          this.competencesName.push(o.competence)
        this.niveau.push(o.niveau)})
        console.log(this.competencesName)
        this.radarChartLabels = this.competencesName;
        
        
        
        },
      error: (e) => {
        
      }
    })
  } 
 
}
