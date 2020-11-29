import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signin(this.authForm.value).subscribe({
      next: (response) => {
        // navigate to feed
        console.log(response);
      },
      error: (error) => {
        if (error.status === 422) {
          // there is a status (eg 422)
          this.authForm.setErrors({ accountNotCreated: error.error.user });
        } else {
          this.authForm.setErrors({ unknownError: 'Unknown error.' });
        }
      },
    });
  }
}
