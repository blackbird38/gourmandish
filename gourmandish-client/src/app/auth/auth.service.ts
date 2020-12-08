import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UsernameAvailableResponse {
  isUsernameAvailable: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  avatar: string;
}

interface SignupResponse {
  username: string;
}

interface SigninCredentials {
  usernameOrEmail: string;
  password: string;
}

interface SigninResponse {
  tokenData: { token: string; expiresIn: number; userId: string };
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:3000/api/auth';
  signedIn$ = new BehaviorSubject(false); // will push the signedIn info to the interested components, the latest value, even to the ones subscribed after it was emitted
  private token: string;

  constructor(private httpClient: HttpClient) {}

  isUsernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.apiUrl}/username`,
      { username }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    //console.log(credentials);
    return this.httpClient
      .post<SignupResponse>(`${this.apiUrl}/signup`, { credentials })
      .pipe(
        // if there  is an error at the signup, it won't reach here
        tap(() => {
          // this.signedIn$.next(true);
        })
      );
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    //console.log(credentials);
    return this.httpClient
      .post<SigninResponse>(`${this.apiUrl}/signin`, { credentials })
      .pipe(
        // if there  is an error at the signup, it won't reach here and signedIn will stay false
        tap((result) => {
          console.log(result);
          this.token = result.tokenData.token;
          this.signedIn$.next(true); // letting all know the user is authenticated
        })
      );
  }
}
