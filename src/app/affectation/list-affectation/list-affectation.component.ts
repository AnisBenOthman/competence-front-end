import { Component, EventEmitter, Input, Output } from '@angular/core';
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
message = "";
alert = 0;
@Output() trig = new EventEmitter<{message : string, alert : number}>;
constructor(private dialogue : MatDialog, private sr : AffectationService) {
  console.log(this.affectations == undefined)
 }
delete(affect : Affectation){
let ref = this.dialogue.open(AlertComponent, { data : { name : affect.competence}})
console.log(affect)
ref.afterClosed().subscribe({
  next : (result)=>{
    if(result == "true"){
      this.sr.deleteAffectation(affect.id).subscribe({
        next: (data : any) => {
          this.message = data.message;
          this.trig.emit({message : affect.competence + " " + this.message, alert : 1})
        },
        error:(er)=> {
          this.trig.emit({message : er.message, alert : 2});
        }
      });
      console.log(affect.id)
      this.affectations = this.affectations.filter((obj) => obj.id != affect.id);
    }
  }
})
}
}
