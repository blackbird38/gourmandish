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
    return this.httpClient.post<any>(`${this.apiUrl}`, recipeData);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }

  getByUserId(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  getLikedByUserId(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/likes/${userId}`);
  }

  async getById(recipeId: string): Promise<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${recipeId}`).toPromise();
  }

  async update(recipeId: string, recipeData: FormData): Promise<any> {
    return this.httpClient
      .put<any>(`${this.apiUrl}/${recipeId}`, recipeData)
      .toPromise();
  }

  async remove(recipeId: string): Promise<any> {
    return this.httpClient
      .delete<any>(`${this.apiUrl}/${recipeId}`)
      .toPromise();
  }

  async toggleLike(recipeId: string, like: boolean): Promise<any> {
    return this.httpClient
      .put<any>(`${this.apiUrl}/like/${recipeId}`, { like })
      .toPromise();
  }
}
