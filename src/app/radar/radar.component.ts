import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartConfiguration, Ticks } from 'chart.js';
import { Affectation } from '../core/models/affectation.model';
import { AffectationService } from '../core/services/affectation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css'],
})
export class RadarComponent {
  title = 'radar de compétence';
  o!: any;
  affectations: any[] = [];
  competencesName: string[] = [];
  niveau: number[] = [];
  id!: number;
  @Input() pays!: string | null;
  userName: string = '';
  constructor(
    private affectationService: AffectationService,
    private ar: ActivatedRoute,
    private dataService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.getAffectationbyUser();
  }

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: { r: { suggestedMin: 0, suggestedMax: 3 } },
  };

  @Input() radarChartLabels: string[] = [];
  @Input() radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] =
    [];
  getAffectationbyUser() {
    this.id = this.ar.snapshot.params['id'];
  }

  getUserById() {
    this.dataService.getUserById(this.id).subscribe({
      next: (data) => {
        this.userName = data.nom;
        this.updateChart();
      },
      error: (err) => alert(err.message),
    });
  }
  updateChart() {
    this.radarChartDatasets = [
      {
        data: this.niveau,
        label: `Competence ${this.userName}`,
        borderWidth: 1,
      },
    ];
  }
}
