import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DigitsOnlyDirective]
})
export class DirectivesModule { }
