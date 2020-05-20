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

    // If a name is specified, look
    // for the corresponding container field
    // if (this.name) {
    //   super.ngOnInit();

    //   this.filteredOptions = this.control.valueChanges
    //     .pipe(
    //       startWith<string | Option>(''),
    //       map(newValue => typeof newValue === 'string' ? newValue : newValue.label),
    //       map(label => label ? this.filter(label) : this.options.slice()));

    //   return;
    // }

  }

  filter(val: string): string[] {
    return this.options.filter(option => {
      console.log(option);
      return option.label.toLowerCase().includes(val.toLowerCase());
    });
  }

  displayFn(option: any): string | undefined {
    return option ? option.label : undefined;
  }

}


export interface Option {
  value: string;
  label: string;
}
