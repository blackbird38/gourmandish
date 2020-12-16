import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeWebService {
  apiUrl: string = 'http://localhost:3000/api/recipes';

  constructor(private httpClient: HttpClient) {}

  create(recipeData: FormData): Observable<any> {
    console.log('recipeData');
    recipeData.forEach((rd) => console.log(rd.toString()));

    return this.httpClient.post<any>(`${this.apiUrl}`, recipeData);
  }
}
