import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    //  console.log(this.authForm.value);
    this.authService.signin(this.authForm.value).subscribe({
      next: (response) => {
        // console.log(response);
        this.router.navigate(['home']);
      },
      error: (error) => {
        //   console.log(error.error);
        this.authForm.setErrors({ notSignedIn: error.error.message }); // 422 or 401
        /*
        if (error.status === 422) {
          // there is a status (eg 422)
          this.authForm.setErrors({ notSignedIn: error.error.message });
        } else {
          this.authForm.setErrors({ unknownError: 'Unknown error.' });
        }*/
      },
    });
  }
}

// TODO: add notifications
