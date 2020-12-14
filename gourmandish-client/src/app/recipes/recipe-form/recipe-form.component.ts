import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { mimeType } from 'src/app/validators/mime-type.validator';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      image: new FormControl(null, {
        validators: [Validators.required],
        //asyncValidators: [mimeType],
      }),
    });
  }

  public selectImage(file: any): void {
    console.log('parent 1', file);
    // TODO: find out why this err here: "ERROR DOMException: An attempt was made to use an object that is not, or is no longer, usable", although all is working
    this.recipeForm.patchValue({ image: file });
    this.recipeForm.get('image').updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      return;
    }
    console.log('parent 2', this.recipeForm.value);
  }
}
