import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent implements OnInit, OnDestroy {
  user: User;
  private userAuthSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    /*
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
    this.user = await this.userService.getById(userId);

    this.userAuthSubscription = this.authService.currentUserData$.subscribe(
      (userData) => {
        const currentUserData = userData;
        console.log(currentUserData, userData);

        if (!currentUserData) {
          return;
        }

        if (currentUserData._id != userId) {
          this.router.navigate([
            'user-settings-page',
            '5fd2b9c467ed5d2b747f4fd4',
          ]); // currentUserData._id
        }

        console.log('all working well');
      }
    );*/
  }

  ngOnDestroy(): void {
    // this.userAuthSubscription.unsubscribe();
  }
}
