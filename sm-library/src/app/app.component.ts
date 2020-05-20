import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SmFormGroup} from './core/components/form-controls/sm-form-group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

isLoading = false;
isDisabled=false;
form:FormGroup;

submit() {
  this.isLoading = true;
   //testing purpose
    if (true) {
      // some logic operations
    this.isLoading = false;
    } else {
      this.isLoading = false;
     
    };
  }
}
 
