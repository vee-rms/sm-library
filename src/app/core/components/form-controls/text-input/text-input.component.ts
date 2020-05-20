import { Component, Optional, Host, SkipSelf, OnInit } from '@angular/core';
import { ControlContainer,FormGroupDirective } from '@angular/forms';

import { AbstractFormField } from '../abstract-form-field';

@Component({
  selector: 'sm-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TextInputComponent extends AbstractFormField implements OnInit {

  constructor(@Optional() @Host() @SkipSelf() public controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit() {

    // If a name is specified, look
    // for the corresponding container field
    if (this.name) {
      super.ngOnInit();
      return;
    }

  }

}
