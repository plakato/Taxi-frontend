import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule,
        MatButtonModule } from '@angular/material';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ImageUploadComponent],
  declarations: [ImageUploadComponent]
})
export class ImageModule { }
