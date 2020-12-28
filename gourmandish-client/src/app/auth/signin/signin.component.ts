import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../auth.service';
import { SigninResponse } from '../auth.webservice';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    usernameOrEmail: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      //Validators.pattern(/^[a-z0-9]+$/), // TODO: || email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly notifier: NotifierService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    //  console.log(this.authForm.value);
    this.authService.signin(this.authForm.value).subscribe({
      next: (response: SigninResponse): void => {
        this.notifier.show({
          message: `You have successfully signed in. Enjoy! :)`,
          type: 'info',
        });
        this.router.navigate(['recipe-list']);
      },
      error: (error) => {
        //   console.log(error.error);
        //   console.log(this.authForm.errors);
        if (error.error.message) {
          this.authForm.setErrors({ notSignedIn: error.error.message }); // 422, 401, 500
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

// TODO: add notifications
