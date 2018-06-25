import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ErrorService } from '../../../general/error/error.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() image: any|string;
  @Output() newImageUploaded = new EventEmitter<string|any>();

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
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
      const extension = file.name.split('.').pop();
      if (['jpeg','jpg', 'gif','png'].indexOf(extension) > -1) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result;
          this.newImageUploaded.emit(reader.result);
        };
      } else {
        this.errorService.showMessageToUser('Povoleny přípony jsou jen .png, .jpg, .jpeg, .gif.');
      }
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
