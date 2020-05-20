import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormControlsModule} from './core/components/form-controls/form-controls.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormControlsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
