import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' }) // to make the class use the dependency injection system (to be able to use httpClient)
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService.isUsernameAvailable(value).pipe(
      map((username) => {
        // gets into map only if the req was successfull 200
        console.log(username);
        if (username.available) {
          return null;
        }
      }),
      catchError((error) => {
        // gets here if http response is 422
        return error.error.username
          ? of({ usernameNotAvailable: true })
          : of({ noConnection: 'No connection.' });
      })
    );
  };
}
