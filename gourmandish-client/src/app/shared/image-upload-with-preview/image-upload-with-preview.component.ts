import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-image-upload-with-preview',
  templateUrl: './image-upload-with-preview.component.html',
  styleUrls: ['./image-upload-with-preview.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ImageUploadWithPreviewComponent implements OnInit {
  imagePreview: string;
  value: any = '';
  @Input() label: string;
  @Input() control: FormControl;
  @Input() imagePath: string;
  @Output()
  selectImageEventEmmitter: EventEmitter<File> = new EventEmitter<File>();

  constructor(private parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  onImageSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];

    this.control.setValue(file);
    this.control.updateValueAndValidity();

    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      this.imagePreview = reader.result as string; // async code
    };
    reader.readAsDataURL(file);
    this.selectImageEventEmmitter.emit(file);
  }

  showErrors() {
    return this.control.hasError('invalidMimeType');
  }
}
