import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: string = '';
  recipe: Recipe = null;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.paramMap.get('id')) {
      this.recipeId = this.route.snapshot.paramMap.get('id');
    }
    this.recipe = await this.recipeService.getById(this.recipeId);
    console.log(this.recipe);
  }
}
