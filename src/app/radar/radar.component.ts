import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  @Input() pays !: string | null;
   userName : string = "";
constructor(private affectationService : AffectationService, private ar: ActivatedRoute, private dataService: UserService, private cdr : ChangeDetectorRef){
  this.getAffectationbyUser();
}


  radarChartOptions: ChartConfiguration<'radar'>['options']= {
    responsive: true, scales : { r : { suggestedMin : 0, suggestedMax :3}}
  }

  @Input() radarChartLabels : string[] = [];
  @Input() radarChartDatasets : ChartConfiguration<'radar'>['data']['datasets'] = []
  getAffectationbyUser(){
    
    this.id = this.ar.snapshot.params["id"];
    // if(this.id){
      
      
    //   this.affectationService.getAffectationByUser(this.ar.snapshot.params["id"]).subscribe({
    //     next: (data : any) => {
    //       this.affectations=data;
    //       this.getUserById();
    //       data.map((o : any) => {
            
    //       this.competencesName.push(o.competence)
    //       this.niveau.push(o.niveau)})
    //       //this.radarChartDatasets = [{data : this.niveau, label: `Competence ${this.userName}`, borderWidth : 1} ]
    //       this.radarChartLabels = this.competencesName;
          
          
    //       },
    //     error: (e) => alert(e.message)
    //   })
    // } else if (this.id == undefined && this.pays == undefined) {
      if (this.id == undefined && this.pays == undefined) {
      this.affectationService.getCompetenceTeam().subscribe({
        next : (data) => {
          
          data.map((o : any) => {
            this.competencesName.push(o.competence)
          this.niveau.push(o.moyenne)})
          this.userName = "Global Team";
          console.log(this.userName)
          this.radarChartLabels = this.competencesName;
          this.radarChartDatasets = [{data : this.niveau, label: `Competence ${this.userName}`, borderWidth : 1} ]
          
          },
        error: (e) => alert(e.message)
      })
    }
    
  } 
  getUserById(){
        this.dataService.getUserById(this.id).subscribe({
          next : (data) => {
            this.userName = data.nom;
            this.updateChart()
            },
          error : (err) => alert(err.message),
        }) 
      }
      updateChart() {
        this.radarChartDatasets = [{ data: this.niveau, label: `Competence ${this.userName}`, borderWidth: 1 }];
      }
  
}
