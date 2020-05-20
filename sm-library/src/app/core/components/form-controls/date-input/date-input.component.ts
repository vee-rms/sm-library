import { Component, Optional, Host, SkipSelf, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { AbstractFormField } from '../abstract-form-field';

@Component({
  selector: 'sm-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends AbstractFormField implements OnInit {

  constructor(@Optional() @Host() @SkipSelf() public controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit() {
    
    if (this.name) {
      super.ngOnInit();
      return;
    }

  }

}
