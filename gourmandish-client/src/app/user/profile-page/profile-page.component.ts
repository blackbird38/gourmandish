import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  recipeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getById(userId);
    this.recipeSubscription = this.recipeService
      .getByUserId(userId)
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
