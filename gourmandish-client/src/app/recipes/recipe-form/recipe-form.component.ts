import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe.model';
import { mimeType } from 'src/app/validators/mime-type.validator';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  recipe: Recipe;
  header: string;
  button: string;
  // isLoading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.recipeForm = this.formBuilder.group({
      title: new FormControl('' || this.recipe.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl('' || this.recipe.description, [
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
    /* */
    let recipeData: FormData = new FormData();
    if (this.recipe.imagePath) {
      // test validity
      // update
      recipeData.append('title', this.recipeForm.get('title').value);
      recipeData.append(
        'description',
        this.recipeForm.get('description').value
      );
      const image = this.recipeForm.get('image').value
        ? this.recipeForm.get('image').value
        : this.recipe.imagePath;
      recipeData.append('image', image);
      this.recipeService.update(this.recipe._id, recipeData);
    } else {
      if (this.recipeForm.invalid) {
        return;
      }
      const recipeData: FormData = new FormData();
      recipeData.append('title', this.recipeForm.get('title').value);
      recipeData.append(
        'description',
        this.recipeForm.get('description').value
      );
      recipeData.append('image', this.recipeForm.get('image').value);
      this.recipeService
        .create(recipeData)
        .subscribe((res) => console.log(res));
    }

    // this.recipeForm.reset();
    this.router.navigate(['recipe-list']);
  }

  private loadData() {
    this.route.snapshot.data.resolverData.subscribe((resolverData) => {
      if (!!resolverData) {
        this.header = resolverData.header;
        this.button = resolverData.button;
        this.recipe = { ...resolverData.recipe };
        //   this.isLoading = false;
      }
    });
  }
}

/**
 *
 *
 *
 * recipeData.forEach((rd) => console.log(rd.toString()));
 */
