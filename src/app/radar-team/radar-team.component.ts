import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { User } from '../user/user.model';
import { Affectation } from '../core/models/affectation.model';
import { AffectationService } from '../core/services/affectation.service';

@Component({
  selector: 'app-radar-team',
  templateUrl: './radar-team.component.html',
  styleUrls: ['./radar-team.component.css']
})
export class RadarTeamComponent {
  paysSelectionne = new FormControl('');
  paysFiltre: string [] = [];
  users !: User[]
  listAffectations: any = {};
  labels : string [] = [];
  filtreArray : any[] = [];
  dataSet: any[] = []
constructor(private lu : UserService, private as : AffectationService){
this.getPays();
// this.filtrePays();
}
getPays(){
  
  this.lu.filtrePays().subscribe({
    next:(data) => {
      this.paysFiltre = data;
      },
    error: (e) => alert(e.message)
  })
}

  filtrePays(){
  console.log(this.paysSelectionne.value);
  this.as.getCompetences().subscribe({
    next:(data)=> this.labels = data,
    error: e=>alert(e.message)
  })
  if(this.paysSelectionne.value != undefined){
    this.dataSet = []
    for (let i =0; i< this.paysSelectionne.value.length; i++){
      this.as.getCompetencePays(this.paysSelectionne.value[i]).subscribe({
        next:(data)=>{
          let index : number[] = [];
          this.filtreArray = [];
          
          for (let i=0; i<this.labels.length; i++){
            
            index.push(this.labels.indexOf(data[i]?.['competence']))
            this.filtreArray.push(0)
          
         }
         for (let i=0 ; i<index.length; i++){
          let val = index[i];
          if(val>=0){
            this.filtreArray[val]= data[i]?.['moyenne']
          }
         }

         
         this.dataSet.push({data : this.filtreArray, label: `${this.paysSelectionne.value?.[i]}`, borderWidth : 1})
          //console.log(this.dataSet);
          //console.log(this.filtreArray)
          //console.log(index)
          // console.log(data)
          // console.log(this.labels)
      },
    error : (e) => alert(e.message) 
    })
  }}
  console.log(this.dataSet)
}
}

  
  //   this.as.getAffectationPays({pays: this.paysSelectionne.value}).subscribe({
  //     next:(data )=> {
        
  //       console.log(data)
  //       this.listAffectations = Object.entries(data.reduce((acc,user) => {
  //         const country = user.pays;
  //         if(acc[country]){
  //           acc[country].push(user);
  //         }else {
  //           acc[country]=[user];
  //         }
  //         return acc;
  //       }, {})).map(([key,valeur]) => ({[key]: valeur}));
        
  //       console.log(this.listAffectations)
  //     },
  //     error : (err) => alert(err.message) 
  //   })
   
