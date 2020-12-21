import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeWebService } from './recipe.webservice';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes$ = new BehaviorSubject([]);
  private recipes: Recipe[] = [];

  constructor(private recipeWebservice: RecipeWebService) {}

  create(recipeData: FormData): Observable<any> {
    return this.recipeWebservice.create(recipeData).pipe(
      tap((result: any) => {
        console.log(result);
        const addedRecipe: Recipe = {
          _id: result.recipe._id,
          title: result.recipe.title,
          description: result.recipe.description,
          imagePath: result.recipe.imagePath,
          createdAt: result.recipe.createdAt,
          updatedAt: result.recipe.updatedAt,
          creator: result.recipe.creator,
        };
        this.recipes = [addedRecipe, ...this.recipes];
        console.log(this.recipes);
        this.recipes$.next(this.recipes);
        //    console.log(result);
      })
    );
  }

  getAll(): Observable<any> {
    return this.recipeWebservice.getAll().pipe(
      tap((result: any) => {
        this.recipes = result.recipeData.recipes;
        console.log(this.recipes);
        this.recipes$.next(this.recipes);
      })
    );
  }

  getByUserId(userId: string): Observable<any> {
    return this.recipeWebservice.getByUserId(userId).pipe(
      tap((result: any) => {
        //console.log(result);
        this.recipes = result.recipeData.recipes;
        console.log(this.recipes);
        this.recipes$.next(this.recipes);
      })
    );
  }

  async getById(recipeId: string): Promise<any> {
    return await this.recipeWebservice.getById(recipeId);
  }
}
