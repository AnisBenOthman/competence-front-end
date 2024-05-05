import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';


    
    const materialComposant = [MatSlideToggleModule, MatDialogModule, MatButtonModule]
@NgModule({
  declarations: [],
  imports: [
  materialComposant
  ],
  exports:[materialComposant]
})
export class MaterialModule { }
