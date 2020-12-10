import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {
  AuthWebservice,
  SigninCredentials,
  SigninResponse,
  SignupCredentials,
  SignupResponse,
  UsernameAvailableResponse,
} from './auth.webservice';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedIn$ = new BehaviorSubject(false); // will push the signedIn info to the interested components, the latest value, even to the ones subscribed after it was emitted
  private token: string;

  constructor(private authWebservice: AuthWebservice) {
    if (this.isValidTokenOnLocalStorage()) {
      this.token = this.getLocalStorageToken();
      this.signedIn$.next(true);
    }
  }

  isUsernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.authWebservice.isUsernameAvailable(username);
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.authWebservice.signup(credentials).pipe(
      // if there  is an error at the signup, it won't reach here
      tap((result: SignupResponse): void => {
        // console.log(result);
        // this.signedIn$.next(true);
      })
    );
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    //console.log(credentials);
    return this.authWebservice.signin(credentials).pipe(
      // if there  is an error at the signup, it won't reach here and signedIn will stay false
      tap((result: SigninResponse): void => {
        //console.log(result);
        this.token = result.authData.token;
        this.setLocalStorageToken(result.authData.token);
        this.signedIn$.next(true); // letting all know the user is authenticated
      })
    );
  }

  signOut(): void {
    this.signedIn$.next(false);
    localStorage.removeItem('token');
  }

  isValidTokenOnLocalStorage(): boolean {
    const token = this.getLocalStorageToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.printExpiringTokenDate(decodedToken.exp);
      return this.isTokenValid(decodedToken.exp);
    }
  }

  getLocalStorageToken(): string {
    return localStorage.getItem('token');
  }

  setLocalStorageToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    return this.token;
  }

  private printExpiringTokenDate(expTime: number): void {
    const d = new Date(0);
    d.setUTCSeconds(expTime);
    console.log('SignIn Token will expire on: ', d);
  }

  private isTokenValid(expTime: number): boolean {
    return expTime > new Date().getTime() / 1000 ? true : false;
  }
}
