import { Component, Optional, Host, SkipSelf, Input, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ControlContainer, Validators } from '@angular/forms';

import { AbstractFormField } from '../abstract-form-field';

import { MatSelectChange, MatSelect } from '@angular/material';
import { FormFieldControl } from '..';

@Component({
  selector: 'sm-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent extends AbstractFormField implements OnInit, AfterViewInit {

  // @Input()
  // displayMode = false;

  options: any[];

  @Output()
  optionSelected = new EventEmitter<string>();

  @ViewChild(MatSelect) matSelect: MatSelect;

  constructor(
    @Optional() @Host() @SkipSelf() public controlContainer: ControlContainer,
  ) {
    super(controlContainer);
  }

  ngOnInit() {

    // If a name is specified, look
    // for the corresponding container field
    if (this.name) {
      super.ngOnInit();
    }


    (<FormFieldControl>this.control).removeValidator(Validators.minLength(this.control.minInputLength));

  }

  ngAfterViewInit() {

    if (!this.matSelect) {
      return;
    }

    this.matSelect.selectionChange.subscribe((selection: MatSelectChange) => {
      this.optionSelected.emit(selection.value);
    });
  }

}
