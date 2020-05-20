import { Component, Optional, Host, SkipSelf, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { AbstractFormField } from '../abstract-form-field';

@Component({
  selector: 'sm-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent extends AbstractFormField implements OnInit  {

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
