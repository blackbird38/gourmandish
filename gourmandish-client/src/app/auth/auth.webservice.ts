import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthWebservice {
  apiUrl: string = 'http://localhost:3000/api/auth';

  constructor(private httpClient: HttpClient) {}

  isUsernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.apiUrl}/username`,
      { username }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    //console.log(credentials);
    return this.httpClient.post<SignupResponse>(`${this.apiUrl}/signup`, {
      credentials,
    });
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    //console.log(credentials);
    return this.httpClient.post<SigninResponse>(`${this.apiUrl}/signin`, {
      credentials,
    });
  }
}

export interface UsernameAvailableResponse {
  isUsernameAvailable: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  avatar: string;
}

export interface SignupResponse {
  username: string;
}

export interface SigninCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface SigninResponse {
  authData: { token: string; userId: string };
  message: string;
}
