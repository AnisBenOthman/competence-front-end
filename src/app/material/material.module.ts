import { NgModule } from '@angular/core';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule,} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

    
    const materialComposant = [MatSlideToggleModule, MatDialogModule, MatButtonModule, MatIconModule, MatRadioModule, MatFormFieldModule, MatInputModule]
@NgModule({
  declarations: [],
  imports: [
  materialComposant
  ],
  exports:[materialComposant]
})
export class MaterialModule { }
