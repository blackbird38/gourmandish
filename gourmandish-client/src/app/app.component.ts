import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  signedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signedIn$.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });
  }

  ngOnDestroy() {}
}
