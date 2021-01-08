import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/models/Recipe.model';
import { mimeType } from 'src/app/validators/mime-type.validator';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  currentUserId: string = '';
  recipeForm: FormGroup;
  recipe: Recipe;
  header: string;
  button: string;
  private userAuth: Subscription;
  // isLoading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private readonly notifier: NotifierService
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
    let recipeData: FormData = new FormData();
    if (this.recipe.imagePath) {
      recipeData.append('title', this.recipeForm.get('title').value);
      recipeData.append(
        'description',
        this.recipeForm.get('description').value
      );
      const image = this.recipeForm.get('image').value
        ? this.recipeForm.get('image').value
        : this.recipe.imagePath;
      recipeData.append('image', image);
      if (this.recipeForm.get('image').hasError('invalidMimeType')) {
        this.notifier.show({
          message: `Oops, please provide de required details to continue. :)`,
          type: 'error',
        });
        return;
      }
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

      this.recipeService.create(recipeData).subscribe();
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

        // TODO: you may want to refacto this:
        this.userAuth = this.authService.currentUserData$.subscribe(
          (userData) => {
            const currentUserData = userData;

            if (!currentUserData) {
              return;
            }

            this.currentUserId = currentUserData._id;

            if (Object.keys(this.recipe).length == 0) {
              return;
            }
            if (this.recipe.creator._id != this.currentUserId) {
              // user is not allowed to edit this recipe because they did not create it
              this.router.navigate(['recipe-list']);
              this.notifier.show({
                message: `Hehe, trying to do something illegal, you smarty? Not allowed to edit a recipe that is not yours. :).`,
                type: 'error',
              });
            }
          }
        );
      }
    });
  }

  private onDelete(recipeId: string) {
    this.recipeService.remove(recipeId);
  }
  ngOnDestroy() {
    this.userAuth.unsubscribe();
  }
}

/*
 * recipeData.forEach((rd) => console.log(rd.toString()));
 */
