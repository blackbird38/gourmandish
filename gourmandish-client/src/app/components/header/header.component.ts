import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  signedIn$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedIn$;
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
  }
}
