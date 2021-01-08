import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: string = '';
  recipe: Recipe = null;
  currentUserId: string = '';
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.paramMap.get('id')) {
      this.recipeId = this.route.snapshot.paramMap.get('id');
    }
    this.recipe = await this.recipeService.getById(this.recipeId);

    this.authService.currentUserData$.subscribe((userData) => {
      const currentUserData = userData;

      if (!currentUserData) {
        return;
      }
      this.currentUserId = currentUserData._id;
    });
  }
}
