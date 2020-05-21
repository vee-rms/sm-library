import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SmFormGroup} from './core/components/form-controls/sm-form-group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
//testing component with radom data
isLoading = false;
isDisabled=false;
form:FormGroup;

constructor(private formBuilder: FormBuilder) { }

ngOnInit() {
  this.form = this.formBuilder.group({
    'testText': [null, [Validators.required]],
  
  });
}

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
 
