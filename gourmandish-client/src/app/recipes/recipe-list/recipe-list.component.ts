import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CurentUserData } from 'src/app/auth/models/current-user-data.model';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: BehaviorSubject<any>;
  //recipes: Recipe[];
  currentUserData: CurentUserData;
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.recipes$ = this.recipeService.recipes$;
  }

  //TODO: resolver or something else
  ngOnInit(): void {
    /* this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
    });*/
    let userId: string;
    this.authService.currentUserData$.subscribe((userData) => {
      this.currentUserData = userData;
      if (this.currentUserData) {
        userId = this.currentUserData._id;
      }
    });

    if (this.route.snapshot.paramMap.get('userId')) {
      userId = this.route.snapshot.paramMap.get('userId');
    }
    console.log(userId);
    if (userId) {
      this.recipeService.getByUserId(userId).subscribe((res: any) => {
        //  this.recipes = res.recipeData.recipes;
        console.log(res);
      });
      return;
    }
    this.recipeService.getAll().subscribe((res: any) => {
      // this.recipes = res.recipeData.recipes;
      console.log(res);
    });
  }
}
