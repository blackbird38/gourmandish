import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/recipes/services/recipe.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User;
  private isFollowedByCurrentUser: boolean = false;
  private recipeSubscription: Subscription;
  private userAuthSubscription: Subscription;
  currentUserId: string;
  followers: User[] = [];
  following: User[] = [];
  modalDisplayable: boolean = false;
  usersToDisplay: User[] = [];
  modalTitleToDisplay: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

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

    this.followers = await this.userService.getFollowers(userId);
    this.following = await this.userService.getFollowing(userId);

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
    this.followers = await this.userService.getFollowers(this.user._id);
    this.following = await this.userService.getFollowing(this.user._id);
  }

  openModalFollowers() {
    this.modalDisplayable = !this.modalDisplayable;
    this.usersToDisplay = this.followers;
    this.modalTitleToDisplay = 'Display Followers';
  }

  openModalFollowing() {
    this.modalDisplayable = !this.modalDisplayable;
    this.modalTitleToDisplay = 'Display Following';
  }
  closeModal() {
    this.modalDisplayable = false;
    this.usersToDisplay = this.following;
  }
  closeModalFromChild(id: string) {
    console.log(id);
    this.closeModal();
    //this.router.navigate(['profile-page', id]);
  }
  ngOnDestroy(): void {
    //this.recipeSubscription.unsubscribe();
    this.userAuthSubscription.unsubscribe();
  }
}
