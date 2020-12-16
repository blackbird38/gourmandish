import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: BehaviorSubject<any>;
  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.recipes$;
  }

  ngOnInit(): void {
    this.recipeService.getAll().subscribe((recipes: any) => {
      //   console.log(this.recipes);
    });
  }
}
