import { Component, Optional, Host, SkipSelf, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { map, startWith } from 'rxjs/operators';

import { AbstractFormField } from '../abstract-form-field';

@Component({
  selector: 'sm-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss']
})
export class AutoCompleteInputComponent extends AbstractFormField implements OnInit {

  @Input()
  options: any[];


  constructor(@Optional() @Host() @SkipSelf() public controlContainer: ControlContainer,
  ) {
    super(controlContainer);

  }

  ngOnInit() {

  }

  displayFn(option: any): string | undefined {
    return option ? option.label : undefined;
  }

}

export interface Option {
  value: string;
  label: string;
}
