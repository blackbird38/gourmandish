import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeFormResolverModel } from '../models/recipe-form-resolver.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeFormResolver implements Resolve<any> {
  constructor(private recipeService: RecipeService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<RecipeFormResolverModel>> {
    let resolverData: RecipeFormResolverModel = {
      header: 'Add new recipe',
      button: 'Add',
      recipe: null,
    };
    const recipeToUpdateId = route.paramMap.get('id');
    if (recipeToUpdateId) {
      const recipe = await this.recipeService.getById(recipeToUpdateId);
      resolverData = {
        header: 'Update recipe',
        button: 'Update',
        recipe,
      };
    }
    return of(resolverData);
  }
}
