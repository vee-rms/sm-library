import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({

  selector: 'sm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']

})

export class ButtonComponent {

  
  @Input() buttonText: string;
  @Input() color: string;//to be implemented 

  @Input() buttonSubmit = false;


  @Input()

  set isDisabled(isDisabled: boolean) {

    this.isDisabled = isDisabled || false;

  }

  get isDisabled(): boolean {

    return this.isDisabled;

  }

  @Input()

  set isActivated(isActivated: boolean) {

    this.isActivated = isActivated || false;

  }

  get isActivated(): boolean {

    return this.isActivated;

  }

  @Output() buttonClick: EventEmitter<any>;

  active = false;

  buttonType: string;

  constructor() {

    this.buttonClick = new EventEmitter<any>();

    this.buttonType = this.buttonSubmit ? `submit` : `button`;

  }



  ngOnInit() {

    this.buttonText = this.buttonText ? this.buttonText : `No buttonText`;

  }



  onClick(): any {

    if (this.isDisabled) {

      return;

    } else {

      this.buttonClick.emit(this.buttonText + ` clicked`);

    }

  }

}