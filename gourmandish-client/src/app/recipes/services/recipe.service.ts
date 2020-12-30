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
        this.recipes$.next(this.recipes);
      })
    );
  }

  getAll(): Observable<any> {
    return this.recipeWebservice.getAll().pipe(
      tap((result: any) => {
        this.recipes = result.recipeData.recipes;
        this.recipes$.next(this.recipes);
      })
    );
  }

  getByUserId(userId: string): Observable<any> {
    return this.recipeWebservice.getByUserId(userId).pipe(
      tap((result: any) => {
        this.recipes = result.recipeData.recipes;
        this.recipes$.next(this.recipes);
      })
    );
  }

  async getById(recipeId: string): Promise<any> {
    return await this.recipeWebservice.getById(recipeId);
  }

  async update(recipeId: string, recipeData: FormData): Promise<any> {
    console.log('update service:');
    recipeData.forEach((rd) => console.log(rd.toString()));
    const updatedRecipe: Recipe = await this.recipeWebservice.update(
      recipeId,
      recipeData
    );
    const updatedRecipes = [...this.recipes];
    const oldRecipeIndex = updatedRecipes.findIndex((r) => r._id === recipeId);
    updatedRecipes[oldRecipeIndex] = updatedRecipe;
    this.recipes = [...updatedRecipes];
    this.recipes$.next([...this.recipes]);
  }

  async remove(recipeId: string): Promise<any> {
    let updatedRecipes = this.recipes.filter((r) => r._id !== recipeId);
    const isRemoved: any = await this.recipeWebservice.remove(recipeId);
    if (!isRemoved) {
      return;
    }
    this.recipes = updatedRecipes;
    this.recipes$.next([...this.recipes]);
  }

  cleanUp() {
    this.recipes$.next([]);
    this.recipes = [];
  }
}
