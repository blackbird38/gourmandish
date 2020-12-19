import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: BehaviorSubject<any>;
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.recipes$ = this.recipeService.recipes$;
  }

  ngOnInit(): void {
    // this.recipeService.getAll().subscribe((recipes: any) => {
    this.recipeService
      .getByUserId(this.authService.getCurrentUserId())
      .subscribe((recipes: any) => {
        //   console.log(this.recipes);
      });
  }
}
