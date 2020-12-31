import { Injectable } from '@angular/core';
import { UserWebService } from './user.webservice';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userWebservice: UserWebService) {}

  async getById(id: string): Promise<any> {
    return await this.userWebservice.getById(id);
  }

  async toggleFollow(id: string, follow: boolean): Promise<any> {
    return await this.userWebservice.toggleFollow(id, follow);
  }

  async getFollowers(id: string): Promise<any> {
    return await this.userWebservice.getFollowers(id);
  }
}
