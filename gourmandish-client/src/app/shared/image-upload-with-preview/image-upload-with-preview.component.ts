import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-image-upload-with-preview',
  templateUrl: './image-upload-with-preview.component.html',
  styleUrls: ['./image-upload-with-preview.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ImageUploadWithPreviewComponent implements OnInit {
  imagePreview: string;
  value: any = '';
  @Input() label: string;
  @Input() control: FormControl;
  @Output()
  selectImageEventEmmitter: EventEmitter<File> = new EventEmitter<File>();

  constructor(private parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  onImageSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    // console.log(this.parentForm.form.controls.image.value);
    // this.parentForm.form.patchValue({ image: file }, { emitEvent: false });

    this.control.setValue(file);
    this.control.updateValueAndValidity();
    //console.log(this.parentForm.form.get('image').value);
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      this.imagePreview = reader.result as string; // async code
    };
    reader.readAsDataURL(file);
    this.selectImageEventEmmitter.emit(file);
  }
}

// TODO: add cropper: https://www.npmjs.com/package/ngx-image-cropper
