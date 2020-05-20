import { Component, Optional, Host, SkipSelf, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { AbstractFormField } from '../abstract-form-field';


@Component({
  selector: 'sm-number-input-currency',
  templateUrl: './number-input-currency.component.html',
  styleUrls: ['./number-input-currency.component.scss']
})
export class NumberInputCurrencyComponent extends AbstractFormField implements OnInit {

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
