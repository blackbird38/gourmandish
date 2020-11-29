import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:3000/api/auth';
  signedIn$ = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) {}

  isUsernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.apiUrl}/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    console.log(credentials);
    return this.httpClient
      .post<SignupResponse>(`${this.apiUrl}/signup`, {
        credentials,
      })
      .pipe(
        // if there  is an error at the signup, it won't reach here
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }
}
