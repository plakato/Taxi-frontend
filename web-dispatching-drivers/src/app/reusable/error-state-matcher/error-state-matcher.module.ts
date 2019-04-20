import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

/** This avoids showing errors before the form was edited (keeping it invalid). **/
export class DirtyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched ));
    }
  }

