import { OnDestroy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() recipe: any;
  private userAuth: Subscription;
  private currentUserId: string = '';
  isLikedByCurrentUser = false;

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.userAuth = this.authService.currentUserData$.subscribe((userData) => {
      const currentUserData = userData;

      if (!currentUserData) {
        return;
      }

      this.currentUserId = currentUserData._id;

      this.isLikedByCurrentUser = this.checkLikedStatus();
    });
  }

  private checkLikedStatus() {
    if (!this.recipe.likes) {
      return false;
    }
    return this.recipe.likes.includes(this.currentUserId);
  }

  showLikedStatus() {
    return this.isLikedByCurrentUser;
  }

  onHeartClick() {
    if (!this.currentUserId) {
      return;
    }
    this.recipeService.toggleLike(this.recipe._id, !this.isLikedByCurrentUser);
  }

  ngOnDestroy() {
    this.userAuth.unsubscribe();
  }
}

// TODO: add loading
