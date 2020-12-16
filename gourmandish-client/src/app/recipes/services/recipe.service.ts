import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecipeWebService } from './recipe.webservice';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private recipeWebservice: RecipeWebService) {}

  create(recipeData: FormData): Observable<any> {
    return this.recipeWebservice.create(recipeData).pipe(
      tap((result: any) => {
        console.log(result);
      })
    );
  }
}
