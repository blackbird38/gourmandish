import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserWebService {
  apiUrl: string = 'http://localhost:3000/api/user';

  constructor(private httpClient: HttpClient) {}

  async getById(userId: string): Promise<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${userId}`).toPromise();
  }

  async toggleFollow(userId: string, follow: boolean): Promise<any> {
    return this.httpClient
      .put<any>(`${this.apiUrl}/follow/${userId}`, { follow: follow })
      .toPromise();
  }

  async getFollowers(userId: string): Promise<any> {
    return this.httpClient
      .get<any>(`${this.apiUrl}/followers/${userId}`)
      .toPromise();
  }
}
