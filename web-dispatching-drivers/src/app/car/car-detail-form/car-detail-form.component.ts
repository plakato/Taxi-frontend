import { Component, Input, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Car } from '../car.module';

@Component({
  selector: 'app-car-detail-form',
  templateUrl: './car-detail-form.component.html',
  styleUrls: ['./car-detail-form.component.scss']
})
export class CarDetailFormComponent implements AfterViewChecked {
  @Input() carForm: FormGroup;
  @Input() image: string|any;
  @Output() newImageUploaded = new EventEmitter<string|any>();

  constructor() { }


  ngAfterViewChecked() {
    this.carForm.controls['name'].setValidators([Validators.required]);
    this.carForm.controls['number'].setValidators([Validators.required]);
    this.carForm.controls['plate'].setValidators([Validators.required, Validators.pattern('[0-9A-Z- :]*')]);
    this.carForm.controls['max_persons'].setValidators([Validators.required, Validators.min(1)]);
   }

  /** Clears input of input file component, so that change event will be triggered on next file upload. */
  clearInput(elem: HTMLInputElement) {
    elem.value = null;
  }

  // event target has to be typed, otherwise property files cannot be accessed.
  onImageLoad(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result;
        this.newImageUploaded.emit(this.image);
      };
    }
  }

  deleteUploadedImage() {
    this.image = null;
    this.newImageUploaded.emit(this.image);
  }

  onResetForm() {
    this.image = null;
    this.newImageUploaded.emit(this.image);
  }


}
