import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
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
@Input() proprety!:string;
@Input() propretyName!:string;
message = "";
alert = 0;
@Output() trig = new EventEmitter<{message : string, alert : number, affect : Affectation}>;
@Output() updateEvent = new EventEmitter<Affectation[]>; //send data : list modified to user-detail component
finalArray : Affectation[] = []; //list which include only affectation who has been changed level
constructor(private dialogue : MatDialog, private sr : AffectationService) {
  
  
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
          this.trig.emit({message : affect.competence + " " + this.message, alert : 1, affect : affect})
        },
        error:(er)=> {
          this.trig.emit({message : er.message, alert : 2, affect : affect});
        }
      });
      console.log(affect.id)
      this.affectations = this.affectations.filter((obj) => obj.id != affect.id);
    }
  }
})
}
onRadioChange(event : MatRadioChange, data : Affectation){
  data.niveau = event.value
  console.log('option selectionnée:', event.value)
    // if(!this.finalArray.some((x) => x.id == data.id )){
    //   this.finalArray.push(data);
    // }
    if(!this.finalArray.includes(data)){
      this.finalArray.push(data);
    }
  console.log(this.finalArray)
  this.updateEvent.emit(this.finalArray)
}
}
