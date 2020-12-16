import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { mimeType } from 'src/app/validators/mime-type.validator';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) {}

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
        asyncValidators: [mimeType],
      }),
    });
  }

  public selectImage(file: any): void {
    this.recipeForm.patchValue({ image: file });
    this.recipeForm.get('image').updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      return;
    }
    console.log(this.recipeForm.get('image').value);

    const recipeData: FormData = new FormData();
    recipeData.append('title', this.recipeForm.get('title').value);
    recipeData.append('description', this.recipeForm.get('description').value);
    recipeData.append('image', this.recipeForm.get('image').value);

    this.recipeService.create(recipeData).subscribe((res) => console.log(res));

    //this.recipeForm.reset();
  }
}
