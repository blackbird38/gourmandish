import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../auth.service';
import { SignupResponse } from '../auth.webservice';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      birthdate: new FormControl(''),
      gender: new FormControl(''),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
    private readonly notifier: NotifierService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.invalid) {
      console.log(this.authForm);
      return;
    }
    this.authService.signup(this.authForm.value).subscribe({
      next: (response: SignupResponse) => {
        //200
        // console.log(response);
        this.notifier.show({
          message: `You have successfully created your account, please login.`,
          type: 'info',
        });
        // this.notifier.notify('success', 'You are awesome! I mean it!');
        this.router.navigate(['signin']);
      },
      error: (error) => {
        //   console.log(error.error);
        //  console.log(this.authForm.errors);
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
