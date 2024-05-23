import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Affectation } from 'src/app/core/models/affectation.model';
import { AffectationService } from 'src/app/core/services/affectation.service';
import { RadarComponent } from 'src/app/radar/radar.component';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  user!: User;
  affectations:Affectation[] = [];
  alert = 0;
  message = "";
  arrayUpdate : Affectation[] = [];
  labels: any[] = [];
  dataSet: number[] = [];
  radarDataSet !: ChartConfiguration<'radar'>['data']['datasets']; 
  @ViewChild(RadarComponent) radar!: RadarComponent;
  constructor(private dataService: UserService, private ar: ActivatedRoute, private affectationService: AffectationService, private cdr : ChangeDetectorRef) {
    this.getUserById();
    this.getAffectationbyUser();
        
   
  }
  ngOnInit(): void {
    
    
  }
  
  ngAfterViewInit(): void {
    this.getUserById()
  }
  
  getUserById(){
    this.dataService.getUserById(this.ar.snapshot.params['id']).subscribe({
      next : (data) => {
        this.user = data;
        },
      error : (err) => alert(err.message),
    }) 
  }
  getAffectationbyUser(){
    this.affectationService.getAffectationByUser(this.ar.snapshot.params["id"]).subscribe({
      next: (data) => {
        this.affectations=data;
        this.affectations.map(o => {
          this.labels.push(o.competence);
          this.dataSet.push(Number(o.niveau));
        this.radarDataSet = [{ data: this.dataSet, label: `Competence ${this.user.nom}`, borderWidth: 1 }];
        })
        console.log(this.labels)
        console.log(this.dataSet)
        },
      error: (e) => {
        this.alert = 2;
        this.message = e.message;
      }
    })
  } 
  updateUser(body:User){
    
    this.dataService.updateUser(this.ar.snapshot.params["id"], body).subscribe({
      next : (data : any) => { 
        this.alert = 1;
        this.message = body.nom + " " +  body.prenom + " " +data.Message;
        this.updateAffectation(this.arrayUpdate)
        
      },
      error : (err)=> {
        this.alert = 2;
        this.message = err.message;
      }
    })
    //this.UpdateRadar()
    
  }

    getDataAffectation(data : any){
      //get data from list-affectation component : cometence with new level change
      // data = affectation objects with new level, only who has modified
      this.arrayUpdate = data
    }

    addAffectation(data : any){
      this.labels = [];
      this.dataSet = [];
      this.affectationService.addAffectation(this.ar.snapshot.params["id"],data.competence.id,{niveau:data.niveau}).subscribe({
        next: (data : any) => {
          this.getAffectationbyUser()
          
          if(data.error){
            this.alert = 2;
            this.message = data.error
          }else {
            this.alert = 1;
            this.message = `${data.competence} add successfully`
            this.labels.push(data.competence);
      this.labels.splice(0,1)
      
      this.dataSet.push(Number(data.niveau));
      this.dataSet.splice(0,1)
      this.radar.radarChartLabels = this.labels;
        
        this.radarDataSet = [{ data: this.dataSet, label: `Competence ${this.user.nom}`, borderWidth: 1 }];
        this.radar.radarChartDatasets = this.radarDataSet;
        console.log(this.labels)
        console.log(this.dataSet)
          } 
          
        },
        error: (error) => {
          this.alert = 2;
          this.message = error.message;
        }
      })
      
      
    }

    declare(data : any){
      this.message = data.message,
      this.alert = data.alert
      setTimeout(() => {
        const index = this.labels.indexOf(data.affect.competence)
        this.labels.splice(index,1);
        this.radar.radarChartLabels = this.labels;
        this.dataSet.splice(index,1);
        this.radarDataSet = [{ data: this.dataSet, label: `Competence ${this.user.nom}`, borderWidth: 1 }];
        this.radar.radarChartDatasets = this.radarDataSet;
        console.log(data.affect.competence)
        console.log(this.labels)
        console.log(this.dataSet)
        this.cdr.detectChanges();
       } ,1000);
    
    }

    updateAffectation(data : any){
      if(data.length > 0){
        let updateCount = 0
        for (let i=0; i < data.length; i++){
          this.affectationService.updateAffectationEmploye(data[i].id,{ niveau : data[i].niveau}).subscribe({
            next:(d : any) => {
              
            const index = this.labels.findIndex( x => x.toLowerCase() == d.employe.competenceId.libelle)
            this.dataSet[index] = Number(data[i].niveau)
            this.radarDataSet = [{ data: this.dataSet, label: `Competence ${this.user.nom}`, borderWidth: 1 }];
           
          },
            error:(erreur) => alert(erreur.message)
          })
          
        }
        
        
        
      }
      
    }

}
