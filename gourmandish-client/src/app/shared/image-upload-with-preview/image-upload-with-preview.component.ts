import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-upload-with-preview',
  templateUrl: './image-upload-with-preview.component.html',
  styleUrls: ['./image-upload-with-preview.component.css'],
})
export class ImageUploadWithPreviewComponent implements OnInit {
  imagePreview: string;
  @Input() label: string;
  @Input() control: FormControl;
  @Output() selectImage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onImageSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      this.imagePreview = reader.result as string; // async code
    };
    reader.readAsDataURL(file);

    this.selectImage.emit(file);
  }
}
