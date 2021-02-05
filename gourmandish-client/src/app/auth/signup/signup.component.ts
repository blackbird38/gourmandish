import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { SignupResponse } from '../auth.webservice';
import { UniqueUsername } from '../validators/unique-username';
import { ValidBirthDate } from '../validators/valid-birthdate';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
    },
    { validators: [this.matchPassword.validate, this.validBirthDate.validate] }
  );

  maxDate: string;

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private validBirthDate: ValidBirthDate,
    private authService: AuthService,
    private router: Router,
    private readonly notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.maxDate = this.setMaxDate();
  }

  private setMaxDate(): string {
    const today = new Date(
      new Date().getFullYear() - 18,
      new Date().getMonth(),
      new Date().getDate()
    );
    return formatDate(today, 'yyyy-MM-dd', 'en-US');
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.notifier.show({
        message: `Oops, please provide de required details to continue. :)`,
        type: 'error',
      });
      return;
    }
    this.authService.signup(this.authForm.value).subscribe({
      next: (response: SignupResponse) => {
        //200
        this.notifier.show({
          message: `You have successfully created your account, please login.`,
          type: 'info',
        });

        this.router.navigate(['signin']);
      },
      error: (error) => {
        if (error.error.message) {
          this.authForm.setErrors({ accountNotCreated: error.error.message }); // 422, 401, 500
        } else {
          this.authForm.setErrors({
            unknownError:
              'Unknown error. Check your internet connection maybe.',
          });
        }
      },
    });
  }
}
