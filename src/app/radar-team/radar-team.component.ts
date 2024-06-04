import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { User } from '../user/user.model';
import { Affectation } from '../core/models/affectation.model';
import { AffectationService } from '../core/services/affectation.service';

import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-radar-team',
  templateUrl: './radar-team.component.html',
  styleUrls: ['./radar-team.component.css'],
})
export class RadarTeamComponent {
  paysSelectionne: FormControl = new FormControl('');
  paysFiltre: string[] = [];
  users!: User[];
  listAffectations: any = {};
  labels: string[] = [];
  filtreArray: any[] = [];
  dataSet!: ChartConfiguration<'radar'>['data']['datasets'];
  name: string = '';
  id!: number;
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(
    private lu: UserService,
    private as: AffectationService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.getPays();
    this.id = this.ar.snapshot.params['id'];
    if (this.id == undefined) {
      this.reloadRadar();
    }
    // this.filtrePays();
  }

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: { r: { suggestedMin: 0, suggestedMax: 3 } },
  };

  reloadRadar() {
    this.as.getCompetenceTeam().subscribe({
      next: (data) => {
        this.labels = [];
        this.filtreArray = [];
        data.map((o: any) => {
          this.labels.push(o.competence);
          this.filtreArray.push(o.moyenne);
        });
        this.name = 'Global Team';

        this.dataSet = [
          {
            data: this.filtreArray,
            label: `Competence ${this.name}`,
            borderWidth: 1,
          },
        ];
        console.log(this.labels);
        console.log(this.dataSet);
      },
      error: (e) => alert(e.message),
    });
  }

  getPays() {
    this.lu.filtrePays().subscribe({
      next: (data) => {
        this.paysFiltre = data;
      },
      error: (e) => alert(e.message),
    });
  }

  filtrePays() {
    console.log(this.paysSelectionne.value);
    if (
      this.paysSelectionne.value != undefined &&
      this.paysSelectionne.value.length > 0
    ) {
      this.dataSet = [];
      for (let i = 0; i < this.paysSelectionne.value.length; i++) {
        this.as.getCompetencePays(this.paysSelectionne.value[i]).subscribe({
          next: (data) => {
            let index: number[] = [];
            this.filtreArray = [];

            for (let i = 0; i < this.labels.length; i++) {
              index.push(this.labels.indexOf(data[i]?.['competence']));
              this.filtreArray.push(0);
            }
            for (let i = 0; i < index.length; i++) {
              let val = index[i];
              if (val >= 0) {
                this.filtreArray[val] = data[i]?.['moyenne'];
              }
            }

            this.dataSet.push({
              data: this.filtreArray,
              label: `${this.paysSelectionne.value?.[i]}`,
              borderWidth: 1,
            });
            this.updateRadar();
            console.log(this.dataSet);
          },
          error: (e) => alert(e.message),
        });
      }
    } else if (
      this.paysSelectionne.value != undefined &&
      this.paysSelectionne.value.length == 0
    ) {
      this.reloadRadar();
    }
  }
  updateRadar() {
    this.cdr.detectChanges();
    if (this.chart) {
      this.chart.update();
    }
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
