import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;
    return password === passwordConfirmation
      ? null
      : { passwordsNotMatching: true };
  }
}

// authForm.errors === { passwordNotMatching: true };
