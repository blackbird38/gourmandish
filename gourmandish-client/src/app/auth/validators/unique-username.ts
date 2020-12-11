import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { UsernameAvailableResponse } from '../auth.webservice';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;
    // console.log(value);
    return this.authService.isUsernameAvailable(value).pipe(
      map((result: UsernameAvailableResponse) => {
        //  console.log(result);
        if (result.isUsernameAvailable) {
          return null;
        }
      }),
      catchError((error) => {
        // gets here if http response is err
        // console.log(error);
        return error.error.message
          ? of({ usernameNotAvailable: true })
          : of({
              unknownError:
                'Unknown error. Check your internet connection maybe.',
            });
      })
    );
  };
}
