import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AuthWebservice,
  SigninCredentials,
  SigninResponse,
  SignupCredentials,
  SignupResponse,
  UsernameAvailableResponse,
} from './auth.webservice';
import { CurentUserData } from './models/current-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedIn$ = new BehaviorSubject(false); // will push the signedIn info to the interested components, the latest value, even to the ones subscribed after it was emitted
  currentUserData$ = new BehaviorSubject(null);

  // private currentUserData: CurentUserData = null;
  private token: string;
  private tokenTimer: any;

  constructor(
    private authWebservice: AuthWebservice,
    private readonly notifier: NotifierService
  ) {
    //this.automaticSignIn();
  }

  isUsernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.authWebservice.isUsernameAvailable(username);
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.authWebservice.signup(credentials).pipe(
      // if there  is an error at the signup, it won't reach here
      tap((result: SignupResponse): void => {
        // this.signedIn$.next(true);
      })
    );
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    return this.authWebservice.signin(credentials).pipe(
      // if there  is an error at the signup, it won't reach here and signedIn will stay false
      tap((result: SigninResponse): void => {
        this.token = result.authData.token;

        this.setLocalStorageToken(this.token);

        const currentUserData = this.getUserDataFromToken(this.token);
        this.currentUserData$.next(currentUserData);

        this.signedIn$.next(true); // letting all know the user is authenticated

        const expiringDuration = this.getExpiringDurationFromToken(this.token);
        this.setSignedInTimer(expiringDuration);
      })
    );
  }

  automaticSignIn(): void {
    if (this.isValidTokenOnLocalStorage()) {
      this.token = this.getLocalStorageToken();

      const currentUserData = this.getUserDataFromToken(this.token);
      this.currentUserData$.next(currentUserData);

      this.signedIn$.next(true);

      const expiringDuration = this.getExpiringDurationFromToken(this.token);
      this.setSignedInTimer(expiringDuration);

      this.notifier.show({
        message: `Welcome back. Enjoy! :)`,
        type: 'info',
      });
    }
  }

  signOut(): void {
    this.signedIn$.next(false);
    this.currentUserData$.next(null);

    localStorage.removeItem('token');

    clearTimeout(this.tokenTimer);

    this.notifier.show({
      message: `You have been successfully disconnected. See you soon! :)`,
      type: 'info',
    });
  }

  private isValidTokenOnLocalStorage(): boolean {
    const token = this.getLocalStorageToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('decodedToken', decodedToken);
      this.printExpiringTokenDate(decodedToken.exp);
      return this.isTokenValid(decodedToken.exp);
    }
  }

  private getLocalStorageToken(): string {
    return localStorage.getItem('token');
  }

  private setLocalStorageToken(token: string) {
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

  private getUserDataFromToken(token: string): CurentUserData {
    const decodedToken: any = jwtDecode(token);
    const {
      userId,
      username,
      firstName,
      lastName,
      email,
      avatar,
    } = decodedToken;
    return {
      _id: userId,
      username,
      firstName,
      lastName,
      email,
      avatar,
    };
  }

  private getExpiringDurationFromToken(token: string): number {
    const decodedToken: any = jwtDecode(token);
    const { exp } = decodedToken;
    const seconds = exp - new Date().getTime() / 1000;
    return seconds;
  }

  private setSignedInTimer(expDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.signOut();
    }, expDuration * 1000);
  }
}
