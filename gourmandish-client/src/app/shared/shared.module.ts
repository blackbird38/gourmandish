import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ImageUploadWithPreviewComponent } from './image-upload-with-preview/image-upload-with-preview.component';

@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    ImageUploadWithPreviewComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, TextareaComponent, ImageUploadWithPreviewComponent],
})
export class SharedModule {}
