import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CurentUserData } from 'src/app/auth/models/current-user-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  signedIn$: BehaviorSubject<boolean>;
  currentUserData: CurentUserData;

  constructor(private authService: AuthService, private router: Router) {
    this.signedIn$ = this.authService.signedIn$;
    this.authService.currentUserData$.subscribe((userData) => {
      this.currentUserData = userData;
    });
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
    this.router.navigate(['signin']);
  }
}
