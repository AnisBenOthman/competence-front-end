import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Affectation } from 'src/app/core/models/affectation.model';
import { AffectationService } from 'src/app/core/services/affectation.service';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent {
@Input() affectations!:Affectation[];
constructor(private dialogue : MatDialog, private sr : AffectationService) { }
delete(affect : Affectation){
let ref = this.dialogue.open(AlertComponent, { data : { name : affect.competence}})
console.log(affect)
ref.afterClosed().subscribe({
  next : (result)=>{
    if(result == "true"){
      this.sr.deleteAffectation(affect.id).subscribe({
        next: (data : any) => console.log(data.message)
      });
      console.log(affect.id)
      this.affectations = this.affectations.filter((obj) => obj.id != affect.id);
    }
  }
})
}
}
