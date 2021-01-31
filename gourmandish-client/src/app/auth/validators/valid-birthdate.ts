import { FormGroup, Validator } from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidBirthDate implements Validator {
  validate(formGroup: FormGroup) {
    const { birthdate } = formGroup.value;
    return parseInt(birthdate.substring(0, 4)) <=
      new Date().getFullYear() - 18 &&
      parseInt(birthdate.substring(0, 4)) >= 1900
      ? null
      : { birthdateNotValid: true };
  }
}

// authForm.errors === { birthdateNotValid: true };
