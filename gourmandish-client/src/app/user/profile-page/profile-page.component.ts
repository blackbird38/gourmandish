import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User;
  private isFollowedByCurrentUser: boolean = false;
  private recipeSubscription: Subscription;
  private userAuthSubscription: Subscription;
  currentUserId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getById(userId);

    this.userAuthSubscription = this.authService.currentUserData$.subscribe(
      (userData) => {
        const currentUserData = userData;

        if (!currentUserData) {
          return;
        }

        this.currentUserId = currentUserData._id;

        this.isFollowedByCurrentUser = this.checkIfFollowedByCurrentUser();
      }
    );

    this.recipeSubscription = this.recipeService
      .getByUserId(userId)
      .subscribe();
  }

  checkIfFollowedByCurrentUser() {
    if (!this.user.followers) {
      return false;
    }

    return this.user.followers.includes(this.currentUserId);
  }

  isUserFollowedByCurrentUser() {
    return this.isFollowedByCurrentUser;
  }

  async toggleFollow() {
    this.user = await this.userService.toggleFollow(
      this.user._id,
      !this.isFollowedByCurrentUser
    );
    this.isFollowedByCurrentUser = this.checkIfFollowedByCurrentUser();
  }

  ngOnDestroy(): void {
    //this.recipeSubscription.unsubscribe();
    this.userAuthSubscription.unsubscribe();
  }
}
