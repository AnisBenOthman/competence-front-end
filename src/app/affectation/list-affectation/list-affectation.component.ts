import { Component, Input } from '@angular/core';
import { Affectation } from 'src/app/core/models/affectation.model';

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent {
@Input() affectations!:Affectation[];
}
