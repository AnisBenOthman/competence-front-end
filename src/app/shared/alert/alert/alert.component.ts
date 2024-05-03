import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
@Input() message:string= "";
@Output() deleteEvent = new EventEmitter<string>();
modalMessage!: string
constructor(){
  
}
ngOnInit(): void {
  this.modalMessage = this.message
  
}
delete(){
this.deleteEvent.emit();
console.log(this.modalMessage)
}
assignName(nom:string){
  this.message = nom;
  console.log(nom)
}

}
