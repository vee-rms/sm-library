import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatTooltipModule
} from '@angular/material';

import { DirectivesModule } from './../directives/directives.module';

import { TextInputComponent } from './text-input/text-input.component';
import { AutoCompleteInputComponent } from './auto-complete-input/auto-complete-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { NumberInputCurrencyComponent } from './number-input-currency/number-input-currency.component';
import { NumberInputTelComponent } from './number-input-tel/number-input-tel.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    DirectivesModule
  ],
  exports: [
    TextInputComponent,
    ButtonComponent,
    AutoCompleteInputComponent,
    SelectInputComponent,
    DateInputComponent,
    NumberInputComponent,
    NumberInputCurrencyComponent,
    NumberInputTelComponent
  ],
  declarations: [
    TextInputComponent,
    ButtonComponent,
    AutoCompleteInputComponent,
    SelectInputComponent,
    DateInputComponent,
    NumberInputComponent,
    NumberInputCurrencyComponent,
    NumberInputTelComponent
  ],
  providers: [ ]
})
export class FormControlsModule { }
