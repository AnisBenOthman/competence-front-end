import { NgModule } from '@angular/core';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


    
    const materialComposant = [MatSlideToggleModule, MatDialogModule, MatButtonModule, MatIconModule]
@NgModule({
  declarations: [],
  imports: [
  materialComposant
  ],
  exports:[materialComposant]
})
export class MaterialModule { }
