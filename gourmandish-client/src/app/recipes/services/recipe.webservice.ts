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
    //recipeData.forEach((rd) => console.log(rd.toString()));
    return this.httpClient.post<any>(`${this.apiUrl}`, recipeData);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }

  getByUserId(userId: string): Observable<any> {
    console.log(`${this.apiUrl}/${userId}`);
    return this.httpClient.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  async getById(recipeId: string): Promise<any> {
    console.log(`${this.apiUrl}/${recipeId}`);
    return this.httpClient.get<any>(`${this.apiUrl}/${recipeId}`).toPromise();
  }
}
